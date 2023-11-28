import {
  fetchEcodatArticlePhotoList,
  fetchEcodatPhotoBig,
  fetchEcodatPhotoSmall,
} from "@/lib/server/ecodat";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prodId = parseInt(req.nextUrl.searchParams.get("product-id") || "");
  let photoId = parseInt(req.nextUrl.searchParams.get("photo-id") || "");
  let big = req.nextUrl.searchParams.get("big") === "true";

  if (!Number(prodId) && !Number(photoId)) {
    return new Response(`missing query param "product-id" or "photo-id"`, {
      status: 422,
    });
  }

  if (!photoId) {
    const photoIds = await fetchEcodatArticlePhotoList({
      articleId: Number(prodId),
    }).catch((e) => {
      console.error(e.message);
      return [];
    });

    if (photoIds.length === 0) {
      return new Response("Not found", { status: 404 });
    }
    photoId = photoIds[0];
  }

  const fetchPhoto = big ? fetchEcodatPhotoBig : fetchEcodatPhotoSmall;

  const base64 = await fetchPhoto({ photoId }).catch((e) => {
    console.error(e.message);
    return null;
  });

  if (!base64) {
    return new Response("Not found", { status: 404 });
  }

  return new Response("data:image/png;base64," + base64);
}
