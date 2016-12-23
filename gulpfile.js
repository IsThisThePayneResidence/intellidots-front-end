'use strict'

const
  gulp = require('gulp'),
  path = require('path'),
  plumber = require('gulp-plumber'),
  watch = require('gulp-watch'),
  sourcemaps = require('gulp-sourcemaps'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('autoprefixer'),
  poststylus = require('poststylus')

const config = {
  src: './src/',
  dist: './dist/public/'
}


gulp.task('html', () =>
  gulp.src(config.src + 'html/**/*.html')
    .pipe(gulp.dest(config.dist)))


gulp.task('styl', () =>
  gulp.src(config.src + 'styl/bundle.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        poststylus([
          autoprefixer({ browsers: ['> 1%'] })
        ])
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dist + '/css')))


gulp.task('fonts', () =>
  gulp.src(config.src + 'fonts/**/*.{eot,ttf,woff,woff2}')
    .pipe(gulp.dest(config.dist + '/fonts')))


gulp.task('watch', () => {
  watch(config.src + 'html/**/*.html', () => gulp.start('html'))
  watch(config.src + 'styl/**/*.styl', () => gulp.start('styl'))
})


gulp.task('default', ['html', 'styl', 'fonts'])