import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { setEcodatAvalability } from "@/lib/server/ecodat/disponabilita";
import { sendEcodatOrder } from "@/lib/server/ecodat/ordine";
import { sendMail } from "@/lib/server/mail";
import { EcodatArticle, productName } from "@/lib/shared/ecodat";
import { checkEnvVariable } from "@/lib/shared/env";
import { NextRequest, NextResponse } from "next/server";
import { stripeInstance } from "../init-stripe";

checkEnvVariable(["NEXT_PUBLIC_WEBSITE_HOST"]);

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  console.log("PAYMENT");
  
  const { amount, paymentMethodId, metadata } = body;

  if (!paymentMethodId) {
    return new NextResponse("Missing paymentMethodId", {
      status: 400,
      statusText: "Missing paymentMethodId",
    });
  }

  if (!amount) {
    return new NextResponse("Missing amount", {
      status: 400,
      statusText: "Missing amount",
    });
  }

  const { err, products } = await handleOrder(metadata);
  if (err) {
    console.error("ERROR handling order:", err);
    return new NextResponse(err, {
      status: 500,
      statusText: "Internal server error",
    });
  }

  const stripe = stripeInstance();

  try {
    const intent = await stripe.paymentIntents.create({
      confirm: true,
      amount: amount * 100,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      payment_method: paymentMethodId,
      return_url:
        process.env.NEXT_PUBLIC_WEBSITE_HOST! +
        "/checkout/success?email=" +
        metadata.email,
      use_stripe_sdk: true,
    });

    await notifyCustomer(metadata, products);

    return new NextResponse(
      JSON.stringify({
        client_secret: intent.client_secret,
        status: intent.status,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log("ERROR creating payment confirm", err.message);
    return new NextResponse("Error creating payment confirm", {
      status: 500,
      statusText: "Error creating payment confirm",
    });
  }
}

async function handleOrder(
  meta: any
): Promise<{ err?: string; products: EcodatArticle[] }> {
  if (!meta) return { err: "Missing metadata", products: [] };

  if (!checkMetadata(meta)) return { err: "Invalid metadata", products: [] };

  const { err: errorObtainProducts, products } = await obtainProducts(meta);
  if (errorObtainProducts) return { err: errorObtainProducts, products: [] };

  const { err: orderError } = await finalizeEcodatOrder(meta, products);
  if (orderError) return { err: orderError, products: [] };

  const { err: disableError } = await disableProducts(products);
  if (disableError) return { err: disableError, products: [] };

  return { products };
}

function checkMetadata(meta: any) {
  const prodIds = meta.products
    ?.split(";")
    ?.map((id: string) => Number(id))
    ?.filter((id: number) => !Number.isNaN(id));

  const commonFieldsValid =
    !!meta.name &&
    !!meta.email &&
    !!meta.cf &&
    !!meta.street &&
    !!meta.number &&
    !!meta.city &&
    !!meta.zip &&
    !!meta.countryCode &&
    !!meta.provinceCode &&
    !!meta.istat;

  let businessPrivateValid = false;
  if (meta.type === "business") {
    businessPrivateValid = !!meta.piva;
  } else {
    businessPrivateValid = !!meta.surname;
  }

  return !!prodIds?.length && commonFieldsValid && businessPrivateValid;
}

async function obtainProducts(meta: any): Promise<{
  products: EcodatArticle[];
  err?: string;
}> {
  const productIds = meta.products.split(";");
  const products: EcodatArticle[] = [];
  try {
    for (const productId of productIds) {
      const p = await fetchEcodatArticle(productId);
      p && products.push(p);
    }
  } catch (e) {
    return { products: [], err: "Could not retrieve ecodat products" };
  }
  return { products };
}

async function finalizeEcodatOrder(
  meta: any,
  products: EcodatArticle[]
): Promise<{ err?: string }> {
  const orderProducts = products.map((p) => ({
    id: p.id.toString(),
    description: p.description,
    oeCode: p.oeCode,
    price: p.price.toString(),
    quantity: "1",
  }));

  if (meta.type === "business") {
    let electronicInvoice = meta.withInvoice
      ? {
          SDI_FE: meta.sdi || undefined,
          PEC_FE: meta.pec || undefined,
        }
      : {};
    return await sendEcodatOrder({
      type: "business",
      // order
      products: orderProducts,
      // shared info
      email: meta.email,
      phone: meta.phone || undefined,
      notes: meta.notes || undefined,
      // business info
      businessName: meta.name,
      piva: meta.piva,
      ...electronicInvoice,
      // address
      address: meta.street,
      civic: meta.number,
      city: meta.city,
      cap: meta.zip,
      cf: meta.cf,
      countryCode: meta.countryCode,
      provinceCode: meta.provinceCode,
      cityIstat: meta.istat,
      dateTime: new Date(),
    })
      .catch((err) => {
        return {
          err: "Errore nell'invio del pagamento al gestionale: " + err.message,
        };
      })
      .then(() => ({}));
  } else {
    return await sendEcodatOrder({
      type: "personal",
      // order
      products: orderProducts,
      // shared info
      email: meta.email,
      phone: meta.phone || undefined,
      notes: meta.notes || undefined,
      // personal info
      name: meta.name,
      surname: meta.surname,
      // address
      address: meta.street,
      civic: meta.number,
      city: meta.city,
      cap: meta.zip,
      cf: meta.cf,
      countryCode: meta.countryCode,
      provinceCode: meta.provinceCode,
      cityIstat: meta.istat,
      dateTime: new Date(),
    })
      .catch((err) => {
        return {
          err: "Errore nell'invio del pagamento al gestionale: " + err.message,
        };
      })
      .then(() => ({}));
  }
}

async function notifyCustomer(
  meta: any,
  products: EcodatArticle[]
): Promise<{ err?: string }> {
  console.log("NOTIFY CUSTOMER", meta.email);

  let user = "";
  if (meta.type === "business") {
    user = meta.name;
  } else {
    user = meta.name + " " + meta.surname;
  }

  return await sendMail(meta.email, "[2M2] notifica di pagamento", {
    html: `
    <body>
    <h1
      style="
        font-size: larger;
        font-weight: 800;
        text-transform: uppercase;
        margin-bottom: 4px;
        font-family: Arial, Helvetica, sans-serif;
      "
    >
      Conferma Pagamento Ricevuto
    </h1>

    <p
      style="
        font-size: medium;
        font-weight: 400;
        margin-top: 1rem;
        margin-bottom: 3rem;
      "
    >
      Gentile <b>${user}</b>, confermiamo la ricezione del suo pagamento. Di
      seguito, i dettagli:
    </p>
    <section style="max-width: 56rem; padding-bottom: 1rem">
      <h2
        style="
          text-transform: uppercase;
          font-size: medium;
          font-weight: 800;
          font-family: Arial, Helvetica, sans-serif;
          margin-bottom: 6px;
        "
      >
        Prodotti acquistati:
      </h2>

      <table>
        <colgroup>
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead
          style="
            text-align: left;
            font-weight: 800;
            text-transform: lowercase;
            color: #363636;
          "
        >
          <th>NAME</th>
          <th style="width: 10px"></th>
          <th>OEM CODE</th>
          <th style="width: 20px"></th>
          <th>PRICE</th>
        </thead>

        <tbody style="text-align: left">
          <tr>
            <td style="height: 4px"></td>
          </tr>

          ${products.map(
            (p) =>
              `<tr>
                  <td>${productName(p)}</td>
                  <td style="width: 10px"></td>
                  <td>${p.id}</td>
                  <td style="width: 20px"></td>
                  <td><b>${p.price}€</b></td>
                </tr>
                <tr>
                  <td style="height: 4px"></td>
                </tr>`
          )}
          
        </tbody>
      </table>
    </section>

    <div style="margin-bottom: 3rem">
      <span
        style="
          color: #363636;
          font-size: medium;
          font-weight: 800;
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
        "
      >
        Indirizzo di spedizione:
      </span>

      <span style="font-size: small; font-weight: normal; margin: 0">
        <span>${meta.street} </span>
        <span>${meta.number} </span>,
        <b>${meta.city} </b>
        <span>${meta.zip}</span>
      </span>
    </div>

    <p style="font-size: medium; font-weight: normal">
      La ringraziamo per aver scelto il nostro servizio.
    </p>

    <br />

    <div style="max-width: 56rem">
      <i style="font-size: normal; font-weight: 100; color: #363636">
        Questa è una risposta automatica. Per eventuali domande o assistenza, ti
        preghiamo di contattare il nostro servizio clienti alla mail:
        <b
          style="
            text-decoration: underline;
            font-style: normal;
            font-weight: 400;
            color: black;
          "
        >
          2m2srl@gmail.com
        </b>
      </i>
    </div>

    <br>

    --

    <br />
    <br />

    <div style="padding-left: 0.8rem; border-left: 1px solid #565656">
      <h3 style="margin: 0;">2m2 autoricambi</h3>
      <div style="font-size: 0.9rem">
        <p style="margin: 0">{setting.info.{settings.info.fullAddress()}}</p>
        <p style="margin: 0.4rem 0 0">
          <b>Mail: </b><span>{settings.info.email}</span>
        </p>
        <p style="margin: 0"><b>Tel: </b><span>{settings.info.phone}</span></p>
      </div>
    </div>
  </body>

    `,
  })
    .catch((err: any) => {
      return {
        err:
          "Impossibile notificare il cliente per l'avvenuto pagamento:\n" +
          err.message,
      };
    })
    .then(() => ({}));
}

async function disableProducts(
  products: EcodatArticle[]
): Promise<{ err?: string }> {
  try {
    for (const product of products) {
      await setEcodatAvalability(product.id, false);
    }
  } catch (err: any) {
    return {
      err:
        "Impossibile rendere non disponibili i prodotti acquistati: " +
        err.message,
    };
  }
  return {};
}
