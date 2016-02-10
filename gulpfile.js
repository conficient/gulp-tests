
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

var html_folder = 'src/**/*.html';
var scripts_folder = 'src/**/*.js';
var styles_folder = 'src/*.less';
var out = 'build';

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

gulp.task('html', function () {
    gulp.src(html_folder)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(out))   // save to build folder
        .pipe(livereload());    // reload
})
// scripts task
// uglifies
gulp.task('scripts', function () {
    // get source files
    gulp.src(scripts_folder)
        .pipe(uglify())     // uglify
        .pipe(gulp.dest(out + '/js')) // save to build folder
        .pipe(livereload()); // reload
});

// copy css to build folder (no change)
gulp.task('styles', function () {
    gulp.src(styles_folder)
        .pipe(less())
        .on('error', errorLog)
        .pipe(gulp.dest(out + '/css/'))
        .pipe(livereload());
});

// watches js files
gulp.task('watch', function () {
    // setup server
    console.log('starting livereload on http://localhost:8080');
    livereload.listen({ port: 8080 });

    gulp.watch(scripts_folder, ['scripts']);
    gulp.watch(styles_folder, ['styles']);


});



// default
gulp.task('default', ['html', 'scripts', 'styles', 'watch']);

