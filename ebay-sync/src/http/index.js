import Koa from "koa";
import Router from "koa-router";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { router as authRouter } from "./auth.js";
import { router as ebayRouter } from "./ebay.js";
import config from "../config.js";

const app = new Koa();
const router = new Router();

router.get("/", async (ctx) => {
  ctx.type = "text/html";
  ctx.body = (await readFile(resolve("./index.html"))).toString();
});

router.use("/auth", authRouter.routes(), authRouter.allowedMethods());
router.use("/ebay", ebayRouter.routes(), ebayRouter.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

export function startServer() {
  app.listen(config.web.port, () =>
    console.log(`server listening on port ${config.web.port}`)
  );
}
