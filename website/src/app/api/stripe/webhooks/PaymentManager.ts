import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { fetchEcodatAvalability } from "@/lib/server/ecodat/disponabilita";
import { sendEcodatOrder } from "@/lib/server/ecodat/ordine";
import { sendMail } from "@/lib/server/mail";
import { EcodatArticle, productName } from "@/lib/shared/ecodat";

const stages = [
  "UNPROCESSED",
  "PRODUCTS_OBTAINED",
  "ORDER_SENT",
  "SELLER_NOTIFIED_FOR_ERROR",
  "CUSTOMER_NOTIFIED",
  "PRODUCTS_DISABLED",
  "CART_EMPTY",
  "ERROR",
  "COMPLETE",
] as const;

type Stage = (typeof stages)[number];

interface Payment {
  stage: Stage;
  id: string;
  /** la validazione dei metadata è fatta alla creazione del paymentIntent */
  meta: any;
  attempts: number;
  errorMessage?: string;

  productIds: string[];
  products: EcodatArticle[];
  disabledIds: number[];
}

const MAX_ATTEMPTS = 5;

export default class PaymentManager {
  private static queue: Payment[] = [];
  private static active = false;
  private static handlers = new Map<Stage, (p: Payment) => Promise<void>>([
    ["UNPROCESSED", this.obtainProducts],
    ["PRODUCTS_OBTAINED", this.sendEcodatOrder],
    ["ORDER_SENT", this.notifyCustomer],
    ["CUSTOMER_NOTIFIED", this.disableProducts],
    ["PRODUCTS_DISABLED", this.emptyCart],
    ["CART_EMPTY", this.complete],
    ["ERROR", this.notifySellerForError],
    ["SELLER_NOTIFIED_FOR_ERROR", this.complete],
    ["COMPLETE", async () => {}],
  ]);

  /**
   * this automatically starts the manager queue
   */
  public static add(paymentIntent: any) {
    console.log("TOOK IN CHARGE:", paymentIntent);

    this.start();
    this.queuePayment({
      // TODO: stripe payment id
      id: "casual",
      stage: stages[0],
      meta: paymentIntent.metadata,
      products: [],
      productIds: paymentIntent.metadata.products.split(";"),
      disabledIds: [],
      attempts: 0,
    });
  }

  public static start() {
    this.loop();
  }

  public static stop() {
    this.active = false;
  }

  private static queuePayment(payment: Payment) {
    this.queue.unshift(payment);
  }

  private static popPayment() {
    let q = this.queue;
    let el = q.pop();
    this.queue = q;
    return el;
  }

  private static async loop() {
    if (this.active) return;
    this.active = true;
    while (this.active) {
      await new Promise((r) => setTimeout(r, 200));
      // this can be asyncronous
      await this.processNextPayment();
    }
  }

  private static async processNextPayment() {
    let payment = this.popPayment();

    if (!payment) return;

    for (const stage of stages) {
      if (payment.stage === stage) {
        console.log(" - payment in stage:", stage);
        await this.handlers.get(stage)!(payment);
      }
    }

    if (
      payment.errorMessage &&
      !["ERROR", "COMPLETE"].includes(payment.stage)
    ) {
      payment.attempts += 1;
      if (payment.attempts > MAX_ATTEMPTS) {
        payment.stage = "ERROR";
      } else {
        payment.errorMessage = undefined;
      }
    }

    if (payment.stage !== "COMPLETE") {
      this.queuePayment(payment);
    }

    if (this.queue.length === 0) {
      this.stop();
    }
  }

  private static async obtainProducts(payment: Payment) {
    let productId = payment.productIds.pop();
    try {
      while (productId !== undefined) {
        // ! se è null senza throw sono cazzi
        const p = await fetchEcodatArticle(productId);
        p && payment.products.push(p);
        productId = payment.productIds.pop();
      }
      payment.stage = "PRODUCTS_OBTAINED";
    } catch (e) {
      productId !== undefined && payment.productIds.push(productId);
      payment.errorMessage = "Errore nel tentativo di ottenere i prodotti";
    }
  }

  private static async sendEcodatOrder(payment: Payment) {
    let send: Promise<Element | null>;

    let products = payment.products.map((p) => ({
      id: p.id.toString(),
      description: p.description,
      oeCode: p.oeCode,
      price: p.price.toString(),
      quantity: "1",
    }));

    if (payment.meta.type === "business") {
      let electronicInvoice = payment.meta.withInvoice
        ? {
            SDI_FE: payment.meta.sdi || undefined,
            PEC_FE: payment.meta.pec || undefined,
          }
        : {};
      send = sendEcodatOrder({
        type: "business",
        // order
        products,
        // shared info
        email: payment.meta.email,
        phone: payment.meta.phone || undefined,
        notes: payment.meta.notes || undefined,
        // business info
        businessName: payment.meta.name,
        piva: payment.meta.piva,
        ...electronicInvoice,
        // address
        address: payment.meta.street,
        civic: payment.meta.number,
        city: payment.meta.city,
        cap: payment.meta.zip,
        cf: payment.meta.cf,
        countryCode: payment.meta.countryCode,
        provinceCode: payment.meta.provinceCode,
        cityIstat: payment.meta.istat,
        dateTime: new Date(),
      });
    } else {
      send = sendEcodatOrder({
        type: "personal",
        // order
        products,
        // shared info
        email: payment.meta.email,
        phone: payment.meta.phone || undefined,
        notes: payment.meta.notes || undefined,
        // personal info
        name: payment.meta.name,
        surname: payment.meta.surname,
        // address
        address: payment.meta.street,
        civic: payment.meta.number,
        city: payment.meta.city,
        cap: payment.meta.zip,
        cf: payment.meta.cf,
        countryCode: payment.meta.countryCode,
        provinceCode: payment.meta.provinceCode,
        cityIstat: payment.meta.istat,
        dateTime: new Date(),
      });
    }

    send
      .then(() => {
        payment.stage = "ORDER_SENT";
      })
      .catch((err) => {
        payment.errorMessage =
          "Errore nell'invio del pagamento al gestionale: " + err.message;
      });
  }

  private static async notifySellerForError(payment: Payment) {
    console.error("FATAL ERRROR AFTER MAX ATTEMPTS\n", payment.errorMessage);

    await sendMail("simo.tasca@gmail.com", "notifica di ERRORRR", {
      html: errorMailTemplate(payment),
    })
      .then(() => {
        payment.stage = "COMPLETE";
      })
      .catch((e: any) => {
        // se c'è un errore non faccio nulla
        // questa fase non può essere ignorata
        console.error(e.message);
      });
  }

  private static async notifyCustomer(payment: Payment) {
    console.log("NOTIFY CUSTOMER", payment.meta.email);

    await sendMail(payment.meta.email, "[2M2] notifica di pagamento", {
      html: `
        <h1 style="text-color: #ff0000;">hai fatto un pagamento</h1>
        products: 
        <table>
          ${payment.products.map(
            (p) =>
              `<tr>
                <td>${productName(p)}</td>
                <td>${p.id}</td>
                <td>${p.price}€</td>
              </tr>`
          )}
        </table>
      `,
    }).catch((err: any) => {
      payment.errorMessage =
        "Impossibile notificare il cliente per l'avvenuto pagamento:\n" +
        err.message;
    });

    payment.stage = "CUSTOMER_NOTIFIED";
  }

  private static async emptyCart(payment: Payment) {
    // lo fa la pagina di success
    // TODO: e se non lo facesse?
    payment.stage = "CART_EMPTY";
  }

  private static async disableProducts(payment: Payment) {
    for (const product of payment.products) {
      if (payment.disabledIds.includes(product.id)) continue;
      try {
        await fetchEcodatAvalability(product.id, false);
        payment.disabledIds.push(product.id);
      } catch (err: any) {
        payment.errorMessage =
          "Impossibile rendere non disponibili i prodotti acquistati: " +
          err.message;
        break;
      }
    }
    payment.stage = "PRODUCTS_DISABLED";
  }

  private static async complete(payment: Payment) {
    payment.stage = "COMPLETE";
  }
}

function errorMailTemplate(payment: Payment): string {
  let user = "";
  if (payment.meta.type === "business") {
    user = payment.meta.name;
  } else {
    user = payment.meta.name + " " + payment.meta.surname;
  }

  return `
    <h1>ordine</h1>

    <p>${payment.errorMessage}</p>

    <h3>Ordine</h3>
    tipo utente: ${payment.meta.type === "business" ? "azienda" : "privato"}
    utente: ${user} 
    numero: ${payment.productIds}
    prodotti: ${payment.productIds.join(", ")}
      
  `;
}
