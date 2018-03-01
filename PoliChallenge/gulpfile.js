﻿/// <binding BeforeBuild='bundle-js' ProjectOpened='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp'), concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.watch(['Site/Services/*.js'], function () {
        gulp.run('bundle-js');
    });
});

gulp.task('bundle-js', function () {
    return gulp.src('Site/Services/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./Output/MyScripts/'));
});