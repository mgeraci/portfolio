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
		filename: `[name]${min}.js`
	};

	if (isProduction) {
		output.publicPath = "//static.michaelgeraci.com/";
	} else {
		output.publicPath = "http://127.0.0.1:8000/static/";
	}

	const resolve = {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx", ".scss"]
	};

	const eslint = {
		emitError: true,
		emitWarning: true,
	};

	const module = {
		preLoaders: [
			// eslint
			{
				test: /\.jsx?$/,
				loader: "eslint-loader",
				exclude: [
					/node_modules/,
					/throttle\.js/,
					/vendor/,
				],
			},

			// pass the public path to a sass variable
			{
				test: /\.(scss)?$/,
				loader: "webpack-append",
				query: `$STATIC_ROOT: '${output.publicPath}';`
			}
		],

		loaders: [
			// react and es6 js
			{
				test: /\.jsx?$/,
				exclude: [/node_modules/],
				loader: "babel-loader",
			},

			// sass, pull into standalone file
			{
				test: /\.(scss)$/,
				exclude: [/node_modules/],
				loader: ExtractTextPlugin.extract("css!sass")
			},

			// ignore fonts
			{
				test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
				loader: "ignore-loader"
			}
		]
	};

	plugins = [
		new ExtractTextPlugin(`../../css/build/styles${min}.css`, {
			allChunks: true
		}),
		new WebpackNotifierPlugin(),
	];


	// production options
	// --------------------------------------------------------------------------

	if (isProduction) {
		plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			})
		);

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
