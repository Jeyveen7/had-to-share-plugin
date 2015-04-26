var gulp = require('gulp');
var compiler = require('gulp-hogan-compile');

gulp.task('mustache', function() {
    gulp.src('assets/templates/**/*.mustache')
        .pipe(compiler('templates.js', {
            wrapper: 'commonjs'
        }))
        .pipe(gulp.dest('src/'));
});
