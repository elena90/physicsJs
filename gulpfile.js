/*==========  Variables  ==========*/
var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

var gulpif = require('gulp-if');

var rename = require('gulp-rename');

var path = require('path');
var folders = require('gulp-folders');

var print = require('gulp-print');
var debug = require('gulp-debug');

var jade = require('gulp-jade');

var baseDirExamples = 'static/examples/';
/*-----  End of Variables  ------*/


gulp.task('commonCss', function () {
    return gulp.src(['src/css/build.less'])
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCSS({
            noAdvanced: true,
            keepSpecialComments: 1
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/css/'));
});

gulp.task('commonJS', function() {
    return gulp.src(['src/js/jquery.min.js'])
            .pipe(concat('lib.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('static/js/'));
});

gulp.task('examplesCss', function() {
    return gulp.src('src/examples/**/css/*.less')
               .pipe(less())
               .pipe(autoprefixer())
               .pipe(minifyCSS({
                    noAdvanced: true,
                    keepSpecialComments: 1
                }))
               .pipe(gulp.dest(baseDirExamples));
});

gulp.task('examplesJs', function() {
    return gulp.src('src/examples/**/js/*.js')
               .pipe(gulp.dest(baseDirExamples));
});

gulp.task('examplesLayouts', function() {
    return gulp.src('src/examples/**/*.jade')
               .pipe(jade())
               .pipe(gulp.dest(baseDirExamples));
});


gulp.task('watch', function () {
    gulp.watch('src/css/**/*', ['commonCss']);
    gulp.watch('src/js/**/*', ['commonJS']);

    gulp.watch('src/examples/**/css/*.less', ['examplesCss']);
    gulp.watch('src/examples/**/js/*.js', ['examplesJs']);

    gulp.watch('src/examples/**/*.jade', ['examplesLayouts']);
    gulp.watch('src/layouts/*.jade', ['examplesLayouts']);
    
});

gulp.task('default', ['commonCss', 'commonJS', 'examplesCss', 'examplesJs', 'examplesLayouts', 'watch']);