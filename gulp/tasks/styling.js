var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

gulp.task('less', ['clean-dist'], function() {
    return gulp.src('./assets/less/**/*.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('images-copy', ['clean-dist'], function() {
    return gulp.src('./assets/img/**/*')
        .pipe(gulp.dest('./dist/img'));
});
