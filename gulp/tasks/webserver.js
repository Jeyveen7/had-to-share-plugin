var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('demo')
        .pipe(webserver({
            livereload: true,
            open: false
        }));
});
