import Router from "koa-router";
import { api } from "../ebay/index.js";

export const router = new Router();

router.get("/test", async ({ response: res }) => {
  const data = await api.test();
  res.body = JSON.stringify(data);
  res.status = 200;
});
