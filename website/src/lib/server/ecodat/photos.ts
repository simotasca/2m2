import { EcodatAction, fetchEcodat } from ".";
import { XMLParser } from "./utils";

export interface APIPhotoList {
  articleId: number;
}

export async function fetchEcodatArticlePhotoList(
  props: APIPhotoList
): Promise<number[]> {
  const xml = `
    <IDArticolo>${props.articleId}</IDArticolo>
  `;

  return fetchEcodat(EcodatAction.PHOTO_LIST, xml).then((res) => {
    if (!res) return [];
    const photoIds = Array.from(res.querySelectorAll("idfoto > long"));
    return photoIds.map((id) => Number(id.textContent));
  });
}

export interface APIPhoto {
  photoId: number;
}

export async function fetchEcodatPhotoSmall(
  props: APIPhoto
): Promise<string | undefined> {
  const xml = `
    <IDFoto>${props.photoId}</IDFoto>
  `;

  return fetchEcodat(EcodatAction.PHOTO_SMALL, xml).then((res) => {
    if (!res) return undefined;
    return XMLParser.getVal(res, "b");
  });
}

export async function fetchEcodatPhotoBig(
  props: APIPhoto
): Promise<string | undefined> {
  const xml = `
    <IDFoto>${props.photoId}</IDFoto>
  `;

  return fetchEcodat(EcodatAction.PHOTO_BIG, xml).then((res) => {
    if (!res) return undefined;
    return XMLParser.getVal(res, "b");
  });
}
