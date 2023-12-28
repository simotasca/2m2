import { randomBytes } from "crypto";
import { EcodatAction, fetchEcodat } from ".";
import settings from "@/settings";

/*
  - [x] email
  - [x] password
  
  - [x] cf (tax id)
  - [x] phone
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 
  - [ ] 

*/

interface OrderApi {
  /** DataOraOrdine */
  dateTime: Date;
  /** FlgPrivato */
  type: "personal" | "business";
  /** CF */
  cf: string;
  /** Email */
  email: string;
  /** Telefono */
  phone?: string;
  /** NoteOrdine */
  notes?: string;
  /** Indirizzo */
  address: string;
  /** Località */
  city: string;
  /** NumeroCivico */
  civic: string;
  /** CAP */
  cap: string;
  /** Comune */
  cityIstat: string;
  /** Provincia */
  provinceCode: string;
  /** Nazione */
  countryCode: string;

  /** RigheOrdine */
  products: OrderProducts[];
}

interface PersonalOrder extends OrderApi {
  type: "personal";
  /** Cognome */
  surname: string;
  /** Nome */
  name: string;
}

interface BusinessOrder extends OrderApi {
  type: "business";
  /** RagioneSociale */
  businessName: string;
  /** Piva */
  piva: string;
  electronicInvoice?:
    | {
        PEC_FE: string;
      }
    | {
        SDI_FE: string;
      };
}

interface OrderProducts {
  /** IDRicambio */
  id: string;
  /** CodiceArticolo */
  oeCode: string;
  /** DescrizioneArticolo */
  description: string;
  /** PrezzoUnitario */
  price: string;
  /** Quantità */
  quantity: string;
}

export async function sendEcodatOrder(params: PersonalOrder | BusinessOrder) {
  const codiceArbitrario = randomBytes(5).toString("hex").slice(0, 10);

  let xml = `
    <IDDocumento>${settings.ecodat.idDocument}</IDDocumento>
    <DataOraOrdine>${dateTimeFormat(params.dateTime)}</DataOraOrdine>
    <CodiceOrdine>${codiceArbitrario}</CodiceOrdine>
    <FlgPrivato>${params.type === "personal" ? "true" : "false"}</FlgPrivato>
    <CF>${params.cf}</CF>
    <Indirizzo>${params.address}</Indirizzo>
    <Località>${params.city}</Località>
    <NumeroCivico>${params.civic}</NumeroCivico>
    <CAP>${params.cap}</CAP>
    <Comune>${params.cityIstat}</Comune>
    <Provincia>${params.provinceCode}</Provincia>
    <Nazione>${params.countryCode}</Nazione>
    <Telefono>${params.phone || "s"}</Telefono>
    <Email>${params.email}</Email>
    <NoteOrdine>${params.notes}</NoteOrdine>
    <RigheOrdine>
      ${params.products.map(rigaOrdine).join("\n")}
    </RigheOrdine>
  `;

  if (params.type === "personal") {
    xml += `
      <Nome>${params.name}</Nome>
      <Cognome>${params.surname}</Cognome>
    `;
  } else {
    xml += `
      <RagioneSociale>${params.businessName}</RagioneSociale>
      <Piva>${params.piva}</Piva>
      ${params.electronicInvoice}
    `;

    if (params.electronicInvoice) {
      if (Object.hasOwn(params.electronicInvoice, "PEC_FE")) {
        /** @ts-ignore */
        xml += `<PEC_FE>${params.electronicInvoice.PEC_FE}</PEC_FE>`;
      } else {
        /** @ts-ignore */
        xml += `<SDI_FE>${params.electronicInvoice.SDI_FE}</SDI_FE>`;
      }
    }
  }

  return fetchEcodat(EcodatAction.SEND_ORDER, xml, "");

  // return await fetch(process.env.ECODAT_API_URL!, {
  //   method: "POST",
  //   body: ecodatBodyTemplate(EcodatAction.SEND_ORDER, xml, ""),
  //   headers: ecodatHeaders(EcodatAction.SEND_ORDER, ""),
  // })
  //   .then((res) => res.text())
  //   .then((text) => {
  //     console.log("RAW order response: ");
  //     console.log(text);
  //     return text;
  //   })
  //   .catch((err) => {
  //     throw new Error(`Error calling ecodat api InviaOrdine: ` + err.message);
  //   })
  //   .then((data) => XMLParser.parse(data).documentElement)
  //   .then((data) => {
  //     const resBody = data.querySelector("soap:Body");
  //     const fault = resBody?.querySelector("soap:Fault");
  //     if (fault) {
  //       const code = XMLParser.getVal(fault, "faultcode");
  //       const message = XMLParser.getVal(fault, "faultstring");
  //       throw new Error(
  //         "Internal Error API Ecodat InviaOrdine: (" + code + ") " + message
  //       );
  //     }
  //     return null;
  //   });
}

function rigaOrdine(p: OrderProducts) {
  return `
    <WMAGAZZINO_DatiRigaOrdine>
      <CodiceArticolo>${p.oeCode}</CodiceArticolo>
      <DescrizioneArticolo>${p.description}</DescrizioneArticolo>
      <PrezzoUnitario>${p.price}</PrezzoUnitario>
      <Quantità>${p.quantity}</Quantità>
      <IDRicambio>${p.id}</IDRicambio>
    </WMAGAZZINO_DatiRigaOrdine>
  `;
}

function dateTimeFormat(date: Date) {
  return [
    String(date.getDate()).padStart(2, "0"),
    String(date.getMonth()).padStart(2, "0"),
    String(date.getFullYear()).padStart(2, "0"),
    " ",
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
  ].join("");
}

// è possibile avere dati dell'azienda nella demo?

/**
 * DOMANDE PER IL PAGAMENTO:
 *
 * M_InviaOrdine:
 * * codiceOrdine da dove lo prendo? arbirìtra
 * * cosa sono codiceArticolo descrizioneArticolo e prezzoUnitario? per ora a caso
 * * * non sono nell'idRicambio?
 * * dove prendo i dati da tabella come comune provincia e nazione? istat
 * * l'indirizzo è quello di spedizione o di fatturazione?, dove metto l'altro?
 *      fatturazione
 *      note per indirizzo di spedizione
 */

interface Ordine {
  dataOra: "DDMMYYYYHHMM";
  codiceOrdine: string; // da dove lo prendo?
  flgPrivato: boolean;
  noteOrdine: string;
  codiceArticolo: string; // ???
  descrizioneArticolo: string; // ???
  prezzoUnitario: number; // ???
  quantità: number; // ???j
  idRicambio: number; // idArticolo
}

interface Azienda {
  ragioneSociale: string;
  codFiscale: string;
  PEC_FE: string; // fattura elettronica (solo uno dei due)
  SDI_FE: string; // fattura elettronica (solo uno dei due)
  telefono?: string;
  email: string;
}

interface Privato {
  nome: string;
  cognome: string;
  codFiscale: string;
  telefono?: string;
  email: string;
}

interface Indirizzo {
  località: string; // paese / città
  indirizzo: string; // via
  numeroCivico: string;
  cap: string;
  comune: number; // da tabella (??)
  provincia: string; // da tabella (??)
  nazione: string; // da tabella (??)
}

/**
 * PROCEDURA ORDINE:
 *
 * Se non è utente registrato proposta registrazione (deve fare redirect al carrello una volta confermato l'utente via email)
 *
 * registrazione:
 *  - privato o azienda
 *  - altri vari dati
 *
 * /checkout
 *
 * la pagina è essenzialmente un wizard
 *
 * indirizzo (di spedizione):
 *  - registrato: seleziona da quelli salvati o crea nuovo
 *  - anonimo: inserisci dati di spedizione
 *
 * l'indirizzo di fatturazione è disponibile solo per gli utenti registrati
 * sezione billing
 *
 * revisione ordine e pagamento:
 *  - dati carta
 */
