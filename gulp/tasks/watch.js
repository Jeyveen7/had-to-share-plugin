var gulp = require('gulp');

gulp.task('watch', function() {
    gulp.watch([
        'src/**/*.es6',
        'assets/less/**/*.less',
        'assets/templates/**/*.mustache'
    ], ['demo-copy']); // will build first
});
