const webpack = require("webpack");

module.exports = {
  // Entry point of your application
  entry: "./src/index.js",

  // Output settings
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },

  // Mode can be 'development' or 'production'
  mode: process.env.NODE_ENV || "development",

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
    }),
  ],

  // Loaders and other configurations
  module: {
    rules: [
      // Babel loader for JS/JSX files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // CSS loader for CSS files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
