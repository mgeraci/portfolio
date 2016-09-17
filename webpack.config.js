const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
  entry: {
		photoblog: "./michael_dot_com/portfolio/static/js/photoblog/Photoblog.jsx",
		app: "./michael_dot_com/portfolio/static/js/app.coffee",
	},

	eslint: {
		emitError: true,
		emitWarning: true,
	},

  output: {
    path: "./michael_dot_com/portfolio/static/js/build/",
    filename: "[name].js"
  },

  module: {
		preLoaders: [{
			// ESLint
			test: /\.jsx?$/,
			loader: "eslint-loader",
			exclude: [
				/node_modules/,
				/coffee/,
				/throttle\.js/,
				/vendor/,
			],
		}],

    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: "babel-loader",
			query: {
				presets: ['es2015', 'react', 'stage-2']
			}
		}, {
			test: /\.coffee$/,
			loader: "coffee-loader",
    }, {
      test: /\.sass$/,
      exclude: [/node_modules/],
      loader: ExtractTextPlugin.extract("css!sass")
    }, {
			test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
			loader: "file?name=../../../static/fonts/[name].[ext]"
		}
		]
  },

  plugins: [
		new ExtractTextPlugin('../../css/build/styles.css', {
			allChunks: true
		}),
    new WebpackNotifierPlugin(),
  ],

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".sass"]
  }
};
