
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    tsc = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    del = require('del');

var PATHS = {
    html:'src/**/*.html',
    scripts:'src/**/*.ts',
    styles:'src/*.less',
    test:'tests/*.ts',
}

var out = 'build';

function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}

var tsProject = tsc.createProject({
    removeComments: false,
    noImplicitAny: false,
    target: "ES5",
    module: "amd",
    declarationFiles: false
});

// clean out the build folder
gulp.task('clean', function () {
    console.log('clean turned off');
    //del('build/**', '!build/');
})

// minify html and copy to build
gulp.task('html', function () {
    gulp.src(PATHS.html)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(out));  // save to build folder
})

// scripts task - compile TS, uglify and output to /build
gulp.task('scripts', function () {
    // get source files
    gulp.src(PATHS.scripts)
        .pipe(tsc(tsProject))
        .on('error', errorLog)
        .pipe(uglify())                 // uglify
        .pipe(gulp.dest(out + '/js'));  // save to build folder
});

// compile LESS files to build folder (no change)
gulp.task('styles', function () {
    gulp.src(PATHS.styles)
        .pipe(less())
        .on('error', errorLog)
        .pipe(gulp.dest(out + '/css/'));
});

gulp.task('test', function() {
    gulp.src(PATHS.test)
        .pipe(tsc(tsProject))
        .pipe(gulp.dest(out + '/tests/'));
        
    gulp.src(out + '/tests/**/*.js')
        .pipe(mocha());
})

// watches js files
gulp.task('watch', function () {
    gulp.watch(PATHS.scripts, ['scripts']);
    gulp.watch(PATHS.styles, ['styles']);

});

gulp.task('build', ['clean', 'html', 'scripts', 'styles']);

// default
gulp.task('default', ['build', 'watch']);

