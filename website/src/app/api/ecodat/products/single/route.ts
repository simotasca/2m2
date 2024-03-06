import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  if (!id)
    return new NextResponse("missing article id", {
      status: 400,
      statusText: "missing article id",
    });

  const product = await fetchEcodatArticle(id).catch((err) => {
    throw new Error(
      `ERROR: fetching ecodat article with id ${id}: ` + err.message
    );
  });

  return new Response(JSON.stringify(product), { status: 200 });
}
