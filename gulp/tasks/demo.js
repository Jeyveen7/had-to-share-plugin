var gulp = require('gulp');

gulp.task('demo-copy', ['build'], function() {
    gulp.src('dist/**').pipe(gulp.dest('demo'));
});
