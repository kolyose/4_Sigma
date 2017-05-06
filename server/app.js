const Koa = require("koa");
const route = require("koa-route");
const serve = require("koa-static");
const fs = require("mz/fs");
const path = require("path");
const multer = require("koa-multer");
const compose = require("koa-compose");
const config = require("./config");

const app = new Koa();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

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
    route.post(
      "/settings",
      compose([
        upload.single("file"),
        async ctx => {
          try {
            const file = fs.createWriteStream("./server/db/settings.json");
            file.end(
              JSON.stringify(
                Object.assign(
                  {
                    imgUrl: `${config.imgUrl}${path.basename(ctx.req.file.path)}`
                  },
                  ctx.req.body
                )
              )
            );
          } catch (e) {
            throw e;
          }

          ctx.status = 200;
        }
      ])
    )
  );

  app.use(
    route.get("/settings", async ctx => {
      try {
        ctx.body = await fs.readFile("./server/db/settings.json", "utf-8");
      } catch (e) {
        throw e;
      }
    })
  );

  return app;
}

module.exports = main();
