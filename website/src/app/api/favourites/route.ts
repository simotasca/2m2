import { fetchEcodatArticle } from "@/lib/server/ecodat";
import { createServerSideClient } from "@/lib/server/supabase";
import { EcodatArticle } from "@/lib/shared/ecodat";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createServerSideClient({ cookies });

  if (!(await supabase.auth.getSession()).data.session) {
    return new Response("not logged", { status: 400 });
  }

  const { data: favs, error } = await supabase.from("favourites").select();
  if (error || !favs) {
    return new Response("error retrieving favourites", { status: 500 });
  }

  const favourites: EcodatArticle[] = [];
  for (const { id_product: id } of favs) {
    const p = await fetchEcodatArticle(id).catch((e) => {
      console.error(
        "ERROR: getting cart, could not fetch article " + id + ":",
        e.message
      );
      return null;
    });
    p && favourites.push(p);
  }

  return new Response(JSON.stringify({ favourites }), {
    status: 200,
  });
}
