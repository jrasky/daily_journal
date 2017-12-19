const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');
const browserSync = require('browser-sync').create();

gulp.task('default', ['webpack', 'html'], function (k) { k(); });

gulp.task('clean', function () {
    return gulp.src(['target', 'dist'])
        .pipe(clean());
});

gulp.task('serve', ['default'], function () {
    browserSync.init({
        server: {
            baseDir: './dist',
        }
    });

    gulp.watch('src/*.js', ['js-watch']);
    gulp.watch('src/*.html', ['html-watch']);
})

gulp.task('babel', function () {
    return gulp.src('src/app.js')
        .pipe(babel({
            presets: ['babel-preset-env', 'babel-preset-react']
        }))
        .pipe(gulp.dest('target'));
});

gulp.task('webpack', ['babel'], function () {
    return gulp.src('target/app.js')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['webpack'], function (k) {
    browserSync.reload();
    k();
})

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], function (k) {
    browserSync.reload();
    k();
})