const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require("webpack");
const path = require("path");

const config = {
  context: path.join(__dirname, "/frontend"),
  entry: {
    game: "./game/index.js",
    admin: "./admin/index.js"
  },
  output: {
    path: path.join(__dirname, "/public/dist"),
    filename: "[name].js"
  },
  watch: NODE_ENV === "development",
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: NODE_ENV === "development" ? "cheap-inline-module-source-map" : null,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
};

const compiler = webpack(config);
compiler.run(err => {
  if (err) {
    console.log(err);
  }
  require("./src/index.js");
});
