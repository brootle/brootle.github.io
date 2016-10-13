//  https://markgoodyear.com/2014/01/getting-started-with-gulp/


var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    concatCss = require('gulp-concat-css'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    spritesmith = require('gulp.spritesmith');

// this converts all scss to css
gulp.task('scss-css', function () {
    return sass('src/styles/scss/**/*.scss', { style: 'expanded' })
      .pipe(gulp.dest('src/styles/css'))
      .pipe(notify({ message: 'scss converted to css' }));
});

// concat CSS and minify, but scss-css task will be run first
gulp.task('concat-min-styles', ['scss-css'], function () {
    var stream = gulp.src('src/styles/css/**/*.css')
      .pipe(concatCss("main.css"))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('dist/assets/styles'))
      .pipe(notify({ message: 'Concat CSS task complete' }));
    return stream;
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('src/images/sprite__main_section/*.png').pipe(spritesmith({
    imgName: 'sprite__main.png',
    cssName: 'sprite__main.css'
  }));
  return spriteData.pipe(gulp.dest('src/images/'));
});

// concat and munify JavaScripts
// gulp.task('scripts', function () {
//     var stream = gulp.src('src/scripts/**/*.js')
//       .pipe(concat('main.js'))
//       .pipe(gulp.dest('dist/assets/scripts'))
//       .pipe(rename({ suffix: '.min' }))
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/assets/scripts'))
//       .pipe(notify({ message: 'Scripts task complete' }));
//     return stream;
// });

//gulp.task('build', ['concat-min-styles', 'scripts']); // these tasks will run parallel
gulp.task('build', ['concat-min-styles']); // these tasks will run parallel

gulp.task('default', ['build']);

gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('src/styles/scss/**/*.scss', ['concat-min-styles']);

    // Watch .js files
    //gulp.watch('src/scripts/**/*.js', ['scripts']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});