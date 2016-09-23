//  https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

// this converts all scss to css
gulp.task('scss-css', function () {
    return sass('src/styles/scss/**/*.scss', { style: 'expanded' })
      .pipe(gulp.dest('src/styles/css'));
});

// concat CSS and minify
gulp.task('concat-min-styles', function () {
    return gulp.src('src/styles/css/**/*.css')
      .pipe(concatCss("main.css"))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(notify({ message: 'Concat CSS task complete' }));
});

// concat and munify JavaScripts
gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/assets/scripts'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/scripts'))
      .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('test', function () {
    console.log('testing gulp')
});

gulp.task('default', function () {
    
});