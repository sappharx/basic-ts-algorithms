///<reference path="./typings/node/node.d.ts" />
///<reference path="./typings/gulp/gulp.d.ts" />

var gulp   = require('gulp'),
    config = require('./gulp.config')(),
    args   = require('yargs').argv,
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('default', ['help']);

gulp.task('help', $.taskListing);

gulp.task('ts', function () {

    return gulp.src(config.typescript.files)
        .pipe($.typescript(config.typescript.options))
        .pipe(gulp.dest(config.root));
});

/**
 * Bump the version
 * --type=pre will bump the pre-release version *.*.*-X
 * --type=patch or no flag will bump the patch version *.*.X
 * --type=minor will bump the minor version *.X.*
 * --type=major will bump the major version X.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
    var msg     = 'Bumping versions';
    var type    = args.type;
    var version = args.version;
    var options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else if (type) {
        options.type = type;
        msg += ' for a ' + type;
    } else {
        msg = 'Version bump was not made';
    }

    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});

////////////////////////////////////////////////////////////////////////////////
function log (msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}