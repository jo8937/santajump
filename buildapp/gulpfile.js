const gulp = require("gulp");
const webserver = require('gulp-webserver');

gulp.task('dev', function(){
  gulp.src('./www/')
  .pipe(webserver({
      livereload: true,
      open: true,
      port: 8888
  }));
});
