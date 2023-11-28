import Stripe from "stripe";

export function stripeInstance() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Env variable STRIPE_SECRET_KEY is required");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-08-16",
  });
}

// è possibile avere dati dell'azienda nella demo?

/**
 * DOMANDE PER IL PAGAMENTO:
 *
 * M_InviaOrdine:
 * * non è documentata la richiesta http
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
