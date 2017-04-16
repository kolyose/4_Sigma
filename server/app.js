const Koa = require("koa");
const route = require("koa-route");
const serve = require("koa-static");
const fs = require("mz/fs");
const path = require("path");

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
  app.use(serve(path.join(__dirname, "./../public")));

  app.use(
    route.post("/settings", async ctx => {
      let data;
      try {
        // TODO: utilize busboy here or some other module koa-multer, koa-better-body
      } catch (e) {
        throw e;
      }

      /* try {
        const file = fs.createWriteStream("./db/settings.json", {
          autoClose: true
        });
        await file.end(data);
      } catch (e) {
        throw e;
      }*/

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
