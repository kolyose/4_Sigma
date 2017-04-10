import Koa from "koa";
import route from "koa-route";
import serve from "koa-static";
import parse from "co-body";
import fs from "mz/fs";

const app = new Koa();

function main() {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      // TODO: add logging here
      console.log(e);
    }
  });

  // TODO: diverse the middleware into different handler files
  app.use(serve("public/admin"));
  app.use(serve("public/game"));

  app.use(
    route.post("/settings", async ctx => {
      let data;
      try {
        data = await parse.form(ctx.req);
      } catch (e) {
        throw e;
      }

      try {
        await fs.writeFile("./db/settings.json", data);
      } catch (e) {
        throw e;
      }

      ctx.status = 200;
    })
  );

  app.use(
    route.get("/settings", async ctx => {
      ctx.body = await fs.readFile("./db/settings.json", "utf-8");
    })
  );

  return app;
}

module.exports = main();
