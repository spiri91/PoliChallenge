/// <reference path="../../output/myscripts/app.js" />
"use strict";
var gameState = {
    inProgress: false,
    score: 0
};

(function (geo, geolib, _, storage, dealer, repo) {
    let elements = {
        distance: $("#distance"),
        score: $('#score'),
        tip: $('#tip')
    }

    let places = [];
    let questions = [];
    let failedQuestions = 0;
    let score = 0;
    let inPlay = false;

    let objective = {
        latitude: 44.434543,
        longitude: 26.048769
    }

    function showDistance(distance) {
        _.setTextOf(elements.distance, distance);
    }

    function intervaledFunction() {
        geo.get().then((result) => {
            if (gameState.inProgress) return;
            if (allPlacesHaveBeenVisited()) {
                markHiScore(gameState.score);
                intervaledFunction = endOfGameFunction();
                return;
            }

            let distance = getDistance();
            showDistance(distance);

            if (checkDistance(distance)) startGameOnPlace();
            else showTipForNextPlace();
        });
    }

    function markHiScore(score) {
       // send score to DB
    }

    function endOfGameFunction() {
        _.confirm('You just finished the game. :) Start over?', () => location.reload());

        endOfGameFunction = () => { };
    }

    function showTipForNextPlace() {
        let place = places[0];
        let tip = place.observations;

        _.setTextOf(elements.tip, tip);
    }

    function allPlacesHaveBeenVisited() {
        return places.length == 0;
    }

    function startGameOnPlace() {
        let place = getNextPlaceAndRemoveIt();
        let questionsForPlace = getQuestionsForPlace(place);

        gamePlay.start(questionsForPlace);
    }

    function getQuestionsForPlace(place) {
        let questionsForPlace = questions.filter((x) => x.for == place.key);

        return questionsForPlace;
    }

    function getNextPlaceAndRemoveIt() {
        let place = places.shift();

        return place;
    }

    function showScore() {
        _.setTextOf(elements.score, gameState.score);
    }

    function checkDistance(distance) {
        if (window.debugModeOn)
            return window.checkDistanceValue;

        return distance < 15;
    }

    function getDistance() {
        if (window.debugModeOn)
            return window.getDistanceValue;

        let currentLocation = {
            latitude: result.coords.latitude,
            longitude: result.coords.longitude
        }

        let distance = geolib.getDistance(objective, currentLocation);

        return distance;
    }

    function init() {
        places = dealer.shuffle(storage.get(storage.names.places));
        questions = storage.get(storage.names.questions);
        //choseTeamName then =>
        setInterval(intervaledFunction, 5000);
        showTipForNextPlace();
    }

    init();
})(geo, geolib, _, storage, dealer, repo);


var gamePlay = (function (dealer) {
    let externalElement = {
        score: $('#score')
    }

    let elements = {
        qContainer: $('#questionsContainer'),
        statement: $('#statement'),
        answer1: $('#answer1'),
        answer2: $('#answer2'),
        answer3: $('#answer3'),
        answer4: $('#answer4'),
        wrongAnsweredQuestionCount: $('#wrAnsQ')
    }

    function bindEvents() {
        elements.answer1.click(checkAnswear);
        elements.answer2.click(checkAnswear);
        elements.answer3.click(checkAnswear);
        elements.answer4.click(checkAnswear);
    }

    let wrongAnsweredQuestions = 0;
    let _questions = [];

    let currentQuestion = {};

    function start(questions) {
        gameState.inProgress = true;
        resetWrongAnsweredQuestions();
        _questions = questions;
        moveNext();
    }

    function resetWrongAnsweredQuestions() {
        wrongAnsweredQuestions = 0;
        _.setTextOf(elements.wrongAnsweredQuestionCount, wrongAnsweredQuestions);
    }

    function moveNext() {
        if (wrongAnsweredQuestions == 2 || _questions.length == 0) {
            stopGame();
            return;
        }

        currentQuestion = _questions.shift();
        showQuestion();
    }

    function stopGame() {
        gameState.inProgress = false;
        _.hideElement(elements.qContainer);
    }

    function showQuestion() {
        let cr = currentQuestion;
        let answers = [cr.answer1, cr.answer2, cr.answer3, cr.correctAnswer];

        showCard(cr.statement, dealer.shuffle(answers));
    }

    function showCard(statement, answers) {
        bindStatementAndAnswers(statement, answers);
        _.showElement(elements.qContainer);
    }

    function bindStatementAndAnswers(statement, answers) {
        _.setTextOf(elements.statement, statement);
        _.setTextOf(elements.answer1, answers[0]);
        _.setTextOf(elements.answer2, answers[1]);
        _.setTextOf(elements.answer3, answers[2]);
        _.setTextOf(elements.answer4, answers[3]);
    }

    function checkAnswear(e) {
        let text = getTextOfAnswer(e);
        if (answerIsCorrect(text))
            gameState.score += 10;
        else
            wrongAnsweredQuestions++;

        showScoreAndWrongAnsweredQuestions();
        moveNext();
    }

    function showScoreAndWrongAnsweredQuestions() {
        _.setTextOf(externalElement.score, gameState.score);
        _.setTextOf(elements.wrongAnsweredQuestionCount, wrongAnsweredQuestions);
    }

    function answerIsCorrect(text) {
        return text === currentQuestion.correctAnswer;
    }

    function getTextOfAnswer(ans) {
        let text = ans.target.innerText;

        return text;
    }

    bindEvents();

    return {
        start: start
    }
})(dealer);

// TODO extract constants object in separate file