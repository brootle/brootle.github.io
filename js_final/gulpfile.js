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
    spritesmith = require('gulp.spritesmith'),
    imagemin = require('gulp-imagemin');

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

// optimize image files
gulp.task('imagemin', () =>
    gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
);

// this will put images together into 1 sprite and will create scss with details for it
gulp.task('sprites', function() {
    var spriteData = gulp.src('src/images/main__sprite/*.png')
    .pipe(spritesmith({
        imgName: 'main__sprite.png',
            cssName: '_main__sprite.scss',
            imgPath: '../images/main__sprite.png',
            padding: 16
    }));
    spriteData.img.pipe(gulp.dest('src/images/'));
    spriteData.css.pipe(gulp.dest('src/styles/scss/'));
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