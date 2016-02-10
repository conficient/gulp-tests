
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber');

var scripts_folder = 'src/**/*.js';
var styles_folder = 'src/**/*.css';
var out = 'build';

// scripts task
// uglifies
gulp.task('scripts', function () {
    // get source files
    gulp.src(scripts_folder)
        .pipe(plumber())
    // uglify
        .pipe(uglify())
    // save to build folder
        .pipe(gulp.dest(out + '/js'));
});

// copy css to build folder (no change)
gulp.task('styles', function () {
    gulp.src(styles_folder)
        .pipe(plumber())
        .pipe(gulp.dest(out + '/css'));
});

// watches js files
gulp.task('watch', function () {
    gulp.watch(scripts_folder, ['scripts']);
});


// default
gulp.task('default', ['scripts', 'styles', 'watch']);

