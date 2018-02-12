/// <binding BeforeBuild='bundle-js' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp'), concat = require('gulp-concat');

watch(['toBundletheseJs/**/*.js'], function () {
    gulp.run('bundle-js');
});

gulp.task('bundle-js', function () {
    return gulp.src('Site/**/*.js')
        .pipe(concat('file.js'))
        .pipe(gulp.dest('./'));
});