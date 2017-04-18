const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

module.exports = {
  host,
  port,
  imgUrl: `${host}:${port}/img/`
};
