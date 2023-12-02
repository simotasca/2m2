import { EcodatAction } from ".";
import { JSDOM } from "jsdom";

export function ecodatBodyTemplate(action: EcodatAction, xml?: string) {
  const token = process.env.ECODAT_API_TOKEN;
  if (!token)
    throw new Error(
      "Error generating Ecodat API req body: missing env variable ECODAT_API_TOKEN"
    );
  return `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <M_Get${action} xmlns="http://ws.ecodat.it/">
          <Token>${token}</Token>${xml || "\n"}</M_Get${action}>
      </soap:Body>
    </soap:Envelope>
  `;
}

export function ecodatHeaders(action: EcodatAction) {
  return {
    "Content-Type": "text/xml; charset=utf-8",
    SOAPAction: `http://ws.ecodat.it/M_Get${action}`,
  };
}

export class XMLParser {
  static parse(data: string) {
    return new JSDOM(data).window.document;
  }

  static getVal(el: Element | null, tag: string) {
    return el?.querySelector(tag)?.innerHTML;
  }

  static getNumber(el: Element | null, tag: string) {
    return parseInt(this.getVal(el, tag)!) ?? undefined;
  }
}
