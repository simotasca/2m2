import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { sendEcodatOrder } from "@/lib/server/ecodat/ordine";
import { sendMail } from "@/lib/server/mail";
import { EcodatArticle } from "@/lib/shared/ecodat";

const stages = [
  "UNPROCESSED",
  "PRODUCTS_OBTAINED",
  "ORDER_SENT",
  "SELLER_NOTIFIED_FOR_ERROR",
  "CUSTOMER_NOTIFIED",
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
}

const MAX_ATTEMPTS = 5;

export default class PaymentManager {
  private static queue: Payment[] = [];
  private static active = false;
  private static handlers = new Map<Stage, (p: Payment) => Promise<void>>([
    ["UNPROCESSED", this.obtainProducts],
    ["PRODUCTS_OBTAINED", this.sendEcodatOrder],
    ["ORDER_SENT", this.notifyCustomer],
    ["CUSTOMER_NOTIFIED", this.emptyCart],
    ["CART_EMPTY", this.complete],
    ["ERROR", this.notifySellerForError],
    ["SELLER_NOTIFIED_FOR_ERROR", this.complete],
    ["COMPLETE", async () => {}],
  ]);

  /**
   * this automatically starts the manager queue
   */
  public static add(paymentIntent: any) {
    this.start();
    this.queuePayment({
      // TODO: stripe payment id
      id: "casual",
      stage: stages[0],
      meta: paymentIntent.metadata,
      products: [],
      productIds: paymentIntent.metadata.products.split(";"),
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
    } catch {
      productId !== undefined && payment.productIds.push(productId);
      payment.errorMessage = "Errore nel tentativo di ottenere i prodotti";
    }
  }

  private static async sendEcodatOrder(payment: Payment) {
    // TODO
    await sendEcodatOrder({
      type: "personal",
      address: "via sottocorno",
      civic: "60",
      city: "sesto san giovanni",
      cap: "20099",
      cf: "TSCSMN96E20F205S",
      countryId: "IT",
      provinceId: "MI",
      cityId: 20099,
      dateTime: new Date(),
      email: "simo.tasca@gmail.com",
      name: "Simone",
      surname: "Tasca",
      notes: "PRIMO ORDINE DEMO",
      products: [],
    })
      .then(() => {
        console.log("ORDER SENT");
        payment.stage = "ORDER_SENT";
      })
      .catch((err) => {
        payment.errorMessage =
          "Errore nell'invio del pagamento al gestionale: " + err.message;
      });
  }

  private static async notifySellerForError(payment: Payment) {
    payment.errorMessage = "BEtteR foRMaAHT\n" + payment.errorMessage;
    console.error("FATAL ERRROR AFTEER MAX ATTEMSP", payment.errorMessage);

    await sendMail("simo.tasca@gmail.com", "notiffica di ERRORRR", {
      text: payment.errorMessage,
    })
      .then(() => {
        payment.stage = "COMPLETE";
      })
      .catch((e) => {
        console.error(e.message);
      });
  }

  private static async notifyCustomer(payment: Payment) {
    await sendMail(payment.meta.email, "notifica di pagamento", {
      text: "hai fatto un pagamento",
    }).catch((err) => {
      payment.errorMessage =
        "Impossibile notificare il cliente per l'avvenuto pagamento: " +
        err.message;
    });

    payment.stage = "CUSTOMER_NOTIFIED";
  }

  private static async emptyCart(payment: Payment) {
    // skip for now
    // throw new Error("todo");
  }

  private static async complete(payment: Payment) {
    payment.stage = "COMPLETE";
  }
}
