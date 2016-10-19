//  https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    concatcss = require('gulp-concat-css'),
    cleancss = require('gulp-clean-css');

gulp.task('test', function () {
    console.log('testing gulp');
});

gulp.task('default', function () {
    
});

// this converts scss to css and creates minimized version also
gulp.task('styles', function () {
    return sass('src/styles/main.scss', { style: 'expanded' })
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano())
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(notify({ message: 'Styles task complete' }));
});

// concat CSS and minify
gulp.task('concat-min-styles', function () {
    return gulp.src('src/styles/**/*.css')
      .pipe(concatcss("main.css"))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(cleancss({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(notify({ message: 'Concat CSS task complete' }));
});

gulp.task('watch', function () {

    // if any changes in scss files we run 'styles' task
    gulp.watch('src/styles/**/*.scss', ['styles']);
});