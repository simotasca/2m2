import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { NextRequest } from "next/server";
import { type } from "os";

interface Params {
  type: string;
  category: string;
}
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const typeId = Number(params.type);
  const categoryId = Number(params.category);

  if (Number.isNaN(categoryId)) {
    return new Response("Category ID is not valid", { status: 422 });
  }

  if (Number.isNaN(typeId)) {
    return new Response("Typology ID is not valid", { status: 422 });
  }

  const products = await fetchEcodatArticles({
    categoryId,
    typeId,
    fetchRow: { nRows: 4, lastRow: 0 },
    disponibile: "disponibile",
  }).catch((err) => {
    throw new Error("Error fetching ecodat articles by typeId: " + err.message);
  });

  return new Response(JSON.stringify(products), { status: 200 });
}
