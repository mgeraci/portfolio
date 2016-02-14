var gulp = require("gulp");
var webpack = require("webpack");
var gutil = require("gulp-util");
var sass = require('gulp-ruby-sass');

var webpackConfig = require("./webpack.config.js");
var cssRoot = "michael_dot_com/portfolio/static/css/";
var cssEntry = "michael_dot_com/portfolio/static/css/styles.sass";
var jsRoot = "michael_dot_com/portfolio/static/js/";
var jsEntry = jsRoot + "wp_test.coffee";

gulp.task("default", function() {
	// compile on start
	gulp.start("compileCSS");
	gulp.start("compileJS");

	// start watchers
	gulp.watch(cssEntry, ["compileCSS"]);
	gulp.watch(jsEntry, ["compileJS"]);
});

gulp.task('compileCSS', function() {
	return sass(cssEntry)
		.on('error', sass.logError)
		.pipe(gulp.dest(cssRoot));
});

gulp.task("compileJS", function(callback) {
	webpack(webpackConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);

		gutil.log("[webpack]", stats.toString({
			// webpack compilation display options
		}));

		callback();
	});
});
