import Router from "koa-router";
import config from "../config.js";
import { checkVersion as checkDBVersion, readDB } from "../db.js";
import { endpoints as ebayUrls, auth } from "../ebay/index.js";
import { errorPage, messagePage } from "./utils.js";

function authenticated(ctx, next) {
  const accessToken = new URL(
    "http://localhost:3000" + ctx.url
  ).searchParams.get("access-token");
  if (accessToken !== config.web.accessToken) {
    ctx.status = 401;
    ctx.body = errorPage("Unauthorized");
  } else {
    return next();
  }
}

export const router = new Router();

router.get("/get-user-token", authenticated, async (ctx) => {
  const db = await readDB();
  if (!db.ebay?.access_token || !(await checkDBVersion())) {
    ctx.redirect(ebayUrls.auth.userGrantAccessPage);
    return;
  }
  ctx.redirect("/auth/success");
});

router.get("/callback", async (ctx) => {
  console.log(ctx.request.query);
  if (ctx.request.query.code) {
    const { data, err } = await auth.fetchUserToken(ctx.request.query.code);
    if (err || !data) {
      ctx.status = 500;
      ctx.body = messagePage("error persisting token");
      return;
    }
    await auth.persistUserToken(data);
  } else {
    ctx.status = 500;
    ctx.body = messagePage("no grant authorization code retrieved");
    return;
  }
  ctx.redirect("/auth/success");
});

router.get("/success", (ctx) => {
  ctx.type = "text/html";
  ctx.body = messagePage("authorization successful");
});
