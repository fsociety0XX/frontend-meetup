const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //This property defines where the application starts

  entry: "./src/index.js",

  //This property defines the file path and the file name which will be used for deploying the bundled file

  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
    publicPath: "/",
  },

  //Setup loaders

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader",
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    port: 8080,
  },

  // Setup plugin to use a HTML file for serving bundled js files
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/assets/favicon.ico",
    }),
  ],
};
