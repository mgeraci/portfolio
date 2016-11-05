function createConfig(params) {
	const isProduction = params.isProduction;
	const min = isProduction ? ".min" : "";
	const webpack = require("webpack");
	const ExtractTextPlugin = require("extract-text-webpack-plugin");
	const WebpackNotifierPlugin = require("webpack-notifier");


	// settings common to both `watch` and `build`
	// --------------------------------------------------------------------------

  const entries = {
		photoblog: "./portfolio/portfolio/static/js/photoblog/Photoblog.jsx",
		app: "./portfolio/portfolio/static/js/app.js",
	};

	const output = {
    path: "./michael_dot_com/portfolio/static/js/build/",
    filename: "[name]" + min + ".js"
  };

  const resolve = {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".sass"]
  };

	const eslint = {
		emitError: true,
		emitWarning: true,
	};

  modules = {
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
				loader: ExtractTextPlugin.extract("css!sass")
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
		entry: entries,
		output: output,
		resolve: resolve,
		eslint: eslint,
		module: modules,
		plugins: plugins,
	};
}

module.exports = createConfig;
