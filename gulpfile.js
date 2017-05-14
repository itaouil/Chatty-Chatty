// Modules
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var nodemon      = require('gulp-nodemon');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

// Live reloading
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000/",
    files: ["public/*/*.*"],
    browser: "safari",
    port: 7000
  });
});

// Nodemon task
gulp.task('nodemon', function(cb) {

  var started = false;

  return nodemon({
    script: './bin/www'
  }).on('start', function() {
    // Avoid multiple restart
    if (!started) {
      cb();
      started = true;
    }
  });

});

// Compile SASS files on change
gulp.task('watch', ['browser-sync', 'sass'], function() {
  gulp.watch('public/sass/*.sass', ['sass']);
  gulp.watch('views/*.pug', browserSync.reload);
  gulp.watch('public/js/*.js', browserSync.reload);
});

// Preprocessing SASS files
gulp.task('sass', function(){
  return gulp.src('public/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
