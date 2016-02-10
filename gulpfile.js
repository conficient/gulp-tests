
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less');

var scripts_folder = 'src/**/*.js';
var styles_folder = 'src/*.less';
var out = 'build';

// scripts task
// uglifies
gulp.task('scripts', function () {
    // get source files
    gulp.src(scripts_folder)
    // uglify
        .pipe(uglify())
    // save to build folder
        .pipe(gulp.dest(out + '/js'));
});

// copy css to build folder (no change)
gulp.task('styles', function () {
    gulp.src(styles_folder)
        .pipe(less())
        .on('error', console.error.bind(console))
        .pipe(gulp.dest(out + '/css/'));
});

// watches js files
gulp.task('watch', function () {
    gulp.watch(scripts_folder, ['scripts']);
    gulp.watch(styles_folder, ['styles']);
});


// default
gulp.task('default', ['scripts', 'styles', 'watch']);

