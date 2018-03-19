/// <reference path="../../output/myscripts/app.js" />
"use strict";
var gameState = {
    inProgress: false,
    score: 0
};

(function (geo, geolib, _, storage, dealer) {
    let elements = {
        distance: $("#distance"),
        score: $('#score')
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

            checkIfAllPlacesHaveBeenVisited();

            let distance = getDistance();
            showDistance(distance);

            if (checkDistance(distance))
                startGameOnPlace();
            else
                showTipForNextPlace();

            showScore();
        });
    }

    function showTipForNextPlace() {

    }

    function checkIfAllPlacesHaveBeenVisited() {

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

        setInterval(intervaledFunction, 5000);
    }

    init();
})(geo, geolib, _, storage, dealer);


var gamePlay = (function (dealer) {
    let wrongAnsweredQuestions = 0;
    let _questions = [];

    let currentQuestion = {};

    function start(questions) {
        gameState.inProgress = true;
        wrongAnsweredQuestions = 0;
        _questions = questions;
        moveNext();
    }

    function moveNext() {
        if (wrongAnsweredQuestions == 2 || _questions.length == 0)
            stopGame();


        currentQuestion = _questions.shift();
        showQuestion();
    }

    function stopGame() {
        gameState.inProgress = false;
    }

    function showQuestion() {
        let cr = currentQuestion;
        let answers = [cr.answer1, cr.answer2, cr.answer3, cr.correctAnswer];

        showCard(cr.statement, dealer.shuffle(answers));
        bindEvents();
    }

    function showCard(statement, answers) {
        debugger;
    }

    function bindEvents() {

    }

    function checkAnswear(e) {
        if (answerIsCorrect(e))
            gameState.score += 10;
        else
            wrongAnsweredQuestions++;

        moveNext();
    }

    function answerIsCorrect(e) {

    }

    return {
        start: start
    }
})(dealer);

// TODO extract constants object in separate file