var gulp = require('gulp');
var bump = require('gulp-bump');
var semver = require('semver');

var bumpTypes = ['major', 'minor', 'patch'];

for (var index in bumpTypes) {
    var type = bumpTypes[index]; // patch / minor / major

    // closure to hold on to 'type', as the task callback is deferred
    (function(type) {
        // create bump tasks
        gulp.task('bump-' + type, function() {
            // `fs` is used instead of require to prevent caching in watch (require caches)
            var fs = require('fs');
            var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
            // increment version
            var version = semver.inc(pkg.version, type);

            return gulp.src('./package.json')
                .pipe(bump({
                    version: version
                }))
                .pipe(gulp.dest('./'));
        });

        // create release tasks
        gulp.task('release-' + type, ['bump-' + type], function() {
            gulp.start('build');
        });
    })(type);
}
