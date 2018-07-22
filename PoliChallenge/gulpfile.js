/// <binding ProjectOpened='runAllMinifiers' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp'), concat = require('gulp-concat'), uglify = require('gulp-uglify'), minifyJS = require('gulp-minify'), cleanCSS = require('gulp-clean-css'), rename = require("gulp-rename");

gulp.task('default', function () {
    gulp.watch(['Site/Services/*.js'], function () {
        gulp.run('bundle-js');
    });
});

gulp.task('runAllMinifiers', function () {
    gulp.run('default');
    gulp.run('minifyGameJS');
    gulp.run('minifyPlaceJS');
    gulp.run('minifyHiScoreJS');
    gulp.run('minifyQuestionsJS');
    gulp.run('minifyMainControllerJS');
    gulp.run('minifyAppJs'),
    gulp.run('minifyMyStyleCss'),
    gulp.run('minifyGameCss'),
    gulp.run('minifyHiScoresCss'),
    gulp.run('minifyPlacesCss'),
    gulp.run('minifyQuestionsCss')
});

gulp.task('bundle-js', function () {
    return gulp.src('Site/Services/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./Output/MyScripts/'));
});

gulp.task('minifyAppJs', function () {
    gulp.watch(['Output/MyScripts/app.js'], function () {
        return gulp.src('Output/MyScripts/app.js')
            .pipe(minifyJS())
            .pipe(gulp.dest('./Output/MyScripts/'));
    });
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

gulp.task('minifyMyStyleCss', function () {
    gulp.watch(['Output/myStyles.css'], function () {
        return gulp.src('Output/myStyles.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('myStyles.min.css'))
            .pipe(gulp.dest('./Output/'));
    });
});

gulp.task('minifyGameCss', function () {
    gulp.watch(['Site/Game/game.css'], function () {
        return gulp.src('Site/Game/game.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('game.min.css'))
            .pipe(gulp.dest('./Site/Game/'));
    });
});

gulp.task('minifyHiScoresCss', function () {
    gulp.watch(['Site/HiScores/hiScore.css'], function () {
        return gulp.src('Site/HiScores/hiScore.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('hiScore.min.css'))
            .pipe(gulp.dest('./Site/HiScores/'));
    });
});

gulp.task('minifyPlacesCss', function () {
    gulp.watch(['Site/Places/place.css'], function () {
        return gulp.src('Site/Places/place.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('place.min.css'))
            .pipe(gulp.dest('./Site/Places/'));
    });
});

gulp.task('minifyQuestionsCss', function () {
    gulp.watch(['Site/Questions/question.css'], function () {
        return gulp.src('Site/Questions/question.css')
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename('question.min.css'))
            .pipe(gulp.dest('./Site/Questions/'));
    });
});