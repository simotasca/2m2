// import { GoTrueClientOptions, createClient } from "@supabase/supabase-js";
// import { parse, serialize } from "cookie";
// import { cookies } from "next/headers";

// type StorageAdapter = Exclude<GoTrueClientOptions["storage"], undefined>;

// class ClientStorageAdapter implements StorageAdapter {
//   getItem(key: string) {
//     const cookies = parse(document.cookie);
//     return JSON.parse(cookies[key]);
//   }

//   setItem(key: string, value: string) {
//     document.cookie = serialize(key, JSON.stringify(value), {
//       httpOnly: false,
//     });
//   }

//   removeItem(key: string) {
//     document.cookie = serialize(key, "", {
//       maxAge: 0,
//       httpOnly: false,
//     });
//   }
// }

// class ServerStorageAdapter implements StorageAdapter {
//   private cookies: typeof cookies;

//   constructor(
//     private readonly context: {
//       cookies: () => ReturnType<typeof cookies>;
//     }
//   ) {
//     this.cookies = cookies;
//   }

//   getItem(key: string) {
//     return JSON.parse(this.cookies().get(key)?.value ?? "null");
//   }

//   setItem(key: string, value: string) {
//     this.cookies().set(key, JSON.stringify(value), {
//       httpOnly: false,
//     });
//   }

//   removeItem(key: string) {
//     document.cookie = serialize(key, "", {
//       maxAge: 0,
//       httpOnly: false,
//     });
//   }
// }

// export const supabaseClient = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
//   {
//     auth: {
//       storage: new ClientStorageAdapter(),
//     },
//   }
// );

// export const supabaseServer = createClient(
//   process.env.SUPABASE_URL ?? "",
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
//   {
//     auth: {
//       storage: new ServerStorageAdapter(),
//     },
//   }
// );
