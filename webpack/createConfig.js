function createConfig(params) {
	const isProduction = params.isProduction;
	const min = isProduction ? ".min" : "";
	const webpack = require("webpack");
	const ExtractTextPlugin = require("extract-text-webpack-plugin");
	const WebpackNotifierPlugin = require("webpack-notifier");


	// settings common to both `watch` and `build`
	// --------------------------------------------------------------------------

  const entry = {
		photoblog: "./portfolio/portfolio/static/js/photoblog/Photoblog.jsx",
		app: "./portfolio/portfolio/static/js/app.js",
	};

	const output = {
    path: "./portfolio/portfolio/static/js/build/",
    filename: "[name]" + min + ".js"
  };

	if (isProduction) {
		output.publicPath = "http://static.michaelgeraci.com/";
	} else {
		output.publicPath = "http://localhost:8000/static/";
	}

  const resolve = {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".sass"]
  };

	const eslint = {
		emitError: true,
		emitWarning: true,
	};

  const module = {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: "eslint-loader",
				exclude: [
					/node_modules/,
					/throttle\.js/,
					/vendor/,
				],
			}
		],

    loaders: [
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: "babel-loader",
				query: {
					presets: ['es2015', 'react', 'stage-2']
				}
			}, {
				test: /\.sass$/,
				exclude: [/node_modules/],
				loader: ExtractTextPlugin.extract("css!sass!@epegzz/sass-vars-loader")
			}, {
				test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader: "ignore-loader"
			}
		]
  };

	plugins = [
		new ExtractTextPlugin("../../css/build/styles" + min + ".css", {
			allChunks: true
		}),
    new WebpackNotifierPlugin(),
  ];


	// production options
	// --------------------------------------------------------------------------

	if (isProduction) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
			})
		);
	}


	// the config object
	// --------------------------------------------------------------------------

	return {
		debug: !isProduction,
		entry,
		output,
		resolve,
		eslint,
		module,
		plugins,
	};
}

module.exports = createConfig;
