gulp = require 'gulp'
notify = require 'gulp-notify'
plumber = require 'gulp-plumber'
sass = require 'gulp-sass'
cssnext = require 'gulp-cssnext'
rename = require 'gulp-rename'
runSequence = require 'run-sequence'
browserSync = require('browser-sync').create()

notify.logLevel 1
errorNotify = errorHandler: notify.onError "Error: <%= error.message %>"

gulp.task "css", ->
  gulp
    .src "./assets/css/index.scss"
    .pipe plumber errorNotify
    .pipe sass()
    .pipe cssnext browsers: [
      'Explorer >= 9'
    ]
    .pipe rename 'style.css'
    .pipe gulp.dest "css/"
    .pipe browserSync.stream()

gulp.task 'watch', ->
  gulp.watch 'src/**/*.ts', ['dev-web']

gulp.task 'build', (cb) -> runSequence(
  'css',
  cb
)

gulp.task 'default', (cb) -> runSequence(
  'build',
  cb
)

gulp.task "watch", ->
  browserSync.init
    server:
      baseDir: "./"
  gulp.watch "./assets/css/**/*.scss", ["css"]
