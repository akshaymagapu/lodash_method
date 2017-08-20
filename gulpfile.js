var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');
var Server = require('karma').Server;
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var netlify = require('gulp-netlify');
var runSequence = require('run-sequence');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');

var DEFAULT = {
    appDir: 'app',
    env: process.env.NODE_ENV || 'development'
};

DEFAULT.outputDir = "dist";
var path = {
    vendors: [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/angular/angular.min.js",
        "https://code.highcharts.com/highcharts.js",
        "https://code.highcharts.com/highcharts-3d.js",
        "https://code.highcharts.com/modules/exporting.js",
        'assets/js/myLodash.js',
        "node_modules/angular-route/angular-route.js",
        "node_modules/bootstrap/dist/css/bootstrap.min.css"
    ],
    HTML: 'index.html',
    ALL: ['app/app.js'],
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src',
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};
gulp.task('webpack', [], function() {
    return gulp.src(path.ALL) // gulp looks for all source files under specified path
        .pipe(sourcemaps.init()) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
        .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
        .pipe(uglify()) // minifies the code for better compression
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    //myConfig.debug = true;
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('watch', function() {
    gulp.watch(path.ALL, ['webpack']);
});
gulp.task('deploy', function() {
        // modify some webpack config options
        var myConfig = Object.create(webpackConfig);
        gulp.src("/" + myConfig.output.publicPath)
            .pipe(netlify({
                site_id: '8daaada9-ab23-4bed-9be6-101c921d41f1'
            }))
    })
    /**
     * Run test once and exit
     */

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        //singleRun: false
    }, function(err) {
        if (err === 0) {
            done();
        } else {
            done(new gutil.PluginError('karma', {
                message: 'Karma Tests failed'
            }));
        }
    }).start();
});

gulp.task('default', ['webpack-dev-server', 'watch']);

var merge = require('merge2');

gulp.task('vendor', function() {
    // Get vendor js
    var vendorJs = gulp.src(path.vendors)

    return merge(vendorJs)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('clean', function() {
    gulp.src('dists/*')
        .pipe(clean({ force: true }));
});

gulp.task('minify-css', function() {
    var opts = { comments: true, spare: true };
    gulp.src(['assets/**/*.css'])
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('dists/'))
});

gulp.task('minify-js', function() {
    gulp.src(path.ALL) // gulp looks for all source files under specified path
        .pipe(sourcemaps.init()) // creates a source map which would be very helpful for debugging by maintaining the actual source code structure
        .pipe(stream(webpackConfig)) // blend in the webpack config into the source files
        .pipe(uglify()) // minifies the code for better compression    
        .pipe(gulp.dest('dists/'))

});

gulp.task('copy-html-files', function() {
    gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', function() {
    runSequence(
        ['clean'], ['minify-css', 'minify-js', 'copy-html-files']
    );
});