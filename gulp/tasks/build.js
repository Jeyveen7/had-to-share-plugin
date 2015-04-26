var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var greplace = require('gulp-replace');
var fs = require('fs');

gulp.task('build', ['lint', 'clean-dist', 'less', 'images-copy', 'mustache'], function() {
    // prevents caching by having pkg initialize on start of build task.
    var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

    return browserify('./src/main.es6', {
            debug: true
        })
        .transform(babelify.configure({

        }))
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('hadtoshare.min.js'))
        .pipe(greplace('**VERSION**', pkg.version))
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});
