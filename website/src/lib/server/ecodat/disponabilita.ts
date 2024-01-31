import { EcodatAction, fetchEcodat } from ".";

export async function setEcodatAvalability(
  articleId: string | number,
  available: boolean
) {
  const xml = `
    <IDArticolo>${articleId}</IDArticolo> 
    <FlgDisponibile>${available ? "true" : "false"}</FlgDisponibile>
  `;

  return fetchEcodat(EcodatAction.DISPONIBILITA, xml, "Set").then(() => {
    return true;
  });
}
