//  https://markgoodyear.com/2014/01/getting-started-with-gulp/

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css');

// concat CSS and minify
gulp.task('concat-min-styles', function () {
    return gulp.src('src/styles/**/*.css')
      .pipe(concatCss("main.css"))
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(notify({ message: 'Concat CSS task complete' }));
});

// this converts scss to css and creates minimized version also
gulp.task('styles', function () {
    return sass('src/styles/main.scss', { style: 'expanded' })
      .pipe(autoprefixer('last 2 version'))
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano())
      .pipe(gulp.dest('dist/assets/css'))
      .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*.js')
      //.pipe(jshint('.jshintrc'))          // was getting - ERROR: Can't find config file: .jshintrc
      //.pipe(jshint.reporter('default'))   // so I just commented this :)
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'))
      .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/assets/img'))
      .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function () {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
