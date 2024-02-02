import Koa from "koa";
import config from "./config.js";
import { resolve } from "node:path";
import { endpoints as ebayUrls, persistUserToken } from "./ebay/index.js";
import { checkVersion as checkDBVersion, readDB, writeDB } from "./db.js";
import { readFile } from "node:fs/promises";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = (await readFile(resolve("./index.html"))).toString();
});

function authMid(ctx, next) {
  const accessToken = new URL("http://localhost:3000" + ctx.url).searchParams.get("access-token");
  if (accessToken !== config.web.accessToken) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
  } else {
    return next();
  }
}

router.get("/auth/get-user-token", authMid, async (ctx) => {
  const db = await readDB();
  if (!db.ebay?.access_token || !(await checkDBVersion())) {
    ctx.redirect(ebayUrls.auth.userGrantAccessPage);
    return;
  }
  ctx.redirect("/");
});

router.get("/auth/callback", async (ctx) => {
  console.log(ctx.request.query);
  if (ctx.request.query.code) {
    const success = await persistUserToken(ctx.request.query.code);
    if (!success) {
      ctx.status = 500;
      ctx.body = messagePage("error persisting token");
      return;
    }
  } else {
    ctx.status = 500;
    ctx.body = messagePage("no grant authorization code retrieved");
    return;
  }
  ctx.redirect("/auth/success");
});

function messagePage(message) {
  return `<p>${message}<p><a href="/">back to home</a>`;
}

router.get("/auth/success", (ctx) => {
  ctx.type = "text/html";
  ctx.body = messagePage("authorization successful");
});

app.use(router.routes());
app.use(router.allowedMethods());

export function startServer() {
  app.listen(config.web.port, () => console.log(`server listening on port ${config.web.port}`));
}
