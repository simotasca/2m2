import { fetchEcodatArticlePhotoList } from "@/lib/server/ecodat";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const articleId = parseInt(req.nextUrl.searchParams.get("product-id") || "");

  if (!Number(articleId)) {
    return new Response(`missing query param "product-id"`, {
      status: 422,
    });
  }

  const { photoIds, err } = await fetchEcodatArticlePhotoList({ articleId })
    .then((photoIds) => ({ photoIds, err: false }))
    .catch((e) => {
      console.error("Error fetching photo list, for product", articleId, ":", e);
      return { photoIds: [], err: true };
    });

  if (err) {
    return new Response("Error fetching ecodat articles", { status: 500, statusText: "ecodat server error" });
  }

  return new Response(JSON.stringify(photoIds));
}
