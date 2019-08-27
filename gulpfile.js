var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');

// var paths = {
//     pages: ['src/*.html']
// };

// gulp.task('copy-html', function () {
//     return gulp.src(paths.pages)
//         .pipe(gulp.dest('dist'));
// });

gulp.task('default', function () {
    return browserify({
        basedir: '.',
        debug: true,
        // entries: [
        //     "main.ts",
        // ],
        entries: [
            "src/index.ts",
            "src/Managers/WeatherBotManager.ts",
            "src/Managers/OpenWeatherAPIManager.ts",
            "src/Managers/WorkplaceAPIManager.ts",
            "src/BusinessObjects/WeatherEntry.ts"
        ],
        cache: {},
        packageCache: {}
    })
        .external('crypto')
        .plugin(tsify)
        .bundle()
        .pipe(source('zapier.js'))
        .pipe(gulp.dest('output'));
});