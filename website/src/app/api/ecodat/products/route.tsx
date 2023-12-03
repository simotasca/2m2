import { fetchEcodatArticles } from "@/lib/server/ecodat";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const filters = await req.json();

  const products = await fetchEcodatArticles(filters).catch((err) => {
    throw new Error(
      "Error fetching ecodat articles with filters: " + err.message
    );
  });

  return new Response(JSON.stringify(products), { status: 200 });
}
