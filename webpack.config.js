const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
  entry: "./michael_dot_com/portfolio/static/js/photoblog/Main.jsx",
  output: {
    path: "./michael_dot_com/portfolio/static/js/",
    filename: "photoblog.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: "babel-loader",
			query: {
				presets: ['es2015', 'react', 'stage-2']
			}
    }, {
      test: /\.scss$/,
      exclude: [/node_modules/],
      loader: ExtractTextPlugin.extract("css!sass")
    }]
  },
  plugins: [
    new ExtractTextPlugin("qa-takehome.css", {
      allChunks: true
    }),
    new WebpackNotifierPlugin()
  ],
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".sass"]
  }
};
