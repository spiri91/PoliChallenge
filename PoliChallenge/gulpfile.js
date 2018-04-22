/// <binding BeforeBuild='bundle-js' ProjectOpened='default' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp'), concat = require('gulp-concat'), uglify = require('gulp-uglify'), minifyJS = require('gulp-minify');

gulp.task('default', function () {
    gulp.watch(['Site/Services/*.js'], function () {
        gulp.run('bundle-js');
    });
});

gulp.task('runAllMinifiers', function () {
    gulp.run('bundle-js');
    gulp.run('minifyGameJS');
    gulp.run('minifyPlaceJS');
    gulp.run('minifyHiScoreJS');
    gulp.run('minifyQuestionsJS');
    gulp.run('minifyMainControllerJS');
});

gulp.task('bundle-js', function () {
    return gulp.src('Site/Services/*.js')
        //.pipe(minifyJS())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./Output/MyScripts/'));
});

gulp.task('minifyGameJS', function () {
    gulp.watch(['Site/Game/game.js'], function () {
        return gulp.src('Site/Game/game.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Site/Game/'));
    });
});

gulp.task('minifyPlaceJS', function () {
    gulp.watch(['Site/Places/place.js'], function () {
        return gulp.src('Site/Places/place.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Site/Places/'));
    });
});

gulp.task('minifyHiScoreJS', function () {
    gulp.watch(['Site/HiScores/hiScore.js'], function () {
        return gulp.src('Site/HiScores/hiScore.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Site/HiScores/'));
    });
});

gulp.task('minifyQuestionsJS', function () {
    gulp.watch(['Site/Questions/question.js'], function () {
        return gulp.src('Site/Questions/question.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Site/Questions/'));
    });
});

gulp.task('minifyMainControllerJS', function () {
    gulp.watch(['Site/MainController.js'], function () {
        return gulp.src('Site/MainController.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Site/'));
    });
});