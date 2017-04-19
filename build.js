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
  devtool: NODE_ENV === "development"
    ? "cheap-inline-module-source-map"
    : false,
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

if (NODE_ENV === "development") {
  compiler.watch(
    {
      aggregateTimeout: 100
    },
    (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true
        })
      );
    }
  );
}

compiler.run(err => {
  if (err) {
    console.log(err);
  }
  require("./server/index.js");
});
