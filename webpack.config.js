jsRoot = "./michael_dot_com/portfolio/static/js/";

module.exports = {
	entry:  jsRoot + "wp_test.coffee",
	output: {
		path:     jsRoot,
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.coffee$/, loader: "coffee-loader" },
		],
	}
};
