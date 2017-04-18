const config = require("./config");
const app = require("./app");

const host = config.host;
const port = config.port;

app.listen(port, host, () => {
  // TODO: add logging
  console.log(`server is listening on ${host}:${port}`);
});
