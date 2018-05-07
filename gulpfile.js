const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config');

const bundler = webpack(webpackConfig);

gulp.task('default', ['webpack', 'html'], function (k) { k(); });

gulp.task('clean', function () {
    return gulp.src(['target', 'dist'])
        .pipe(clean());
});

gulp.task('serve', ['html'], function () {
    browserSync.init({
        server: {
            baseDir: webpackConfig.output.path,
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: { colors: true }
                }),
                webpackHotMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath
                })
            ]
        }
    });

    gulp.watch('src/*.html', ['html-watch']);
})

gulp.task('webpack', function () {
    gulp.src('src/app.tsx')
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], function (k) {
    browserSync.reload();
    k();
})