
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    tsc = require('gulp-typescript'),
    del = require('del');

var html_folder = 'src/**/*.html';
var scripts_folder = 'src/**/*.ts';
var styles_folder = 'src/*.less';
var out = 'build';

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

var tsProject = tsc.createProject({
  removeComments : false,
  noImplicitAny : false,
  target : "ES5",
  module : "amd",
  declarationFiles : false
});

// clean out the build folder
gulp.task('clean', function() {
    del('build/**','!build/');
})

// minify html and copy to build
gulp.task('html', function () {
    gulp.src(html_folder)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(out))   // save to build folder
        .pipe(livereload());    // reload
})

// scripts task - compile TS, uglify and output to /build
gulp.task('scripts', function () {
    // get source files
    gulp.src(scripts_folder)
        .pipe(tsc(tsProject))
        .on('error', errorLog)
        .pipe(uglify())     // uglify
        .pipe(gulp.dest(out + '/js')) // save to build folder
        .pipe(livereload()); // reload
});

// compile LESS files to build folder (no change)
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
gulp.task('default', ['clean','html', 'scripts', 'styles', 'watch']);

