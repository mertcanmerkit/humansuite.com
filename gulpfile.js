const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

// Procces HTML
gulp.task('taskHTML', async function(){
    return gulp.src('./dev/index.html')
    .pipe(gulp.dest('./dist/'))
})

// Procces CSS
gulp.task('taskCSS', async function(){
    return gulp.src('./dev/scss/main.scss')
    .pipe(sass({outputStyled: 'nested'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename('dist.main.css'))
    .pipe(gulp.dest('./dist/css/'))
})

// Procces JS
gulp.task('taskJS', async function(){
    return gulp.src('./dev/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})

// Procces Assets

gulp.task('taskAssets', async function(){
    return gulp.src('./dev/assets/**/*')
        .pipe(gulp.dest('./dist/assets'))
})

// Watch
gulp.task('watch', async function(){
    gulp.watch('./dev/scss/**/*.scss', gulp.series('taskCSS'))
    gulp.watch('./dev/js/**/*.js', gulp.series('taskJS'))
    gulp.watch('./dev/index.html', gulp.series('taskHTML'))
    gulp.watch('./dev/assets/**/*', gulp.series('taskAssets'))
})