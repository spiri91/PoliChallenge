/// <reference path="../../output/myscripts/app.js" />
"use strict";

(function (geo, geolib, _, storage, dealer) {
    let elements = {
        distance: $("#distance"),
        score: $('#score')
    }

    let places = [];
    let questions = [];
    let failedQuestions = 0;
    let score = 0;

    let objective = {
        latitude: 44.434543,
        longitude: 26.048769
    }

    function showDistance(distance) {
        _.setTextOf(elements.distance, distance);
    }

    function intervaledFunction() {
        geo.get().then((result) => {
            let distance = getDistance();
            showDistance(distance);
            checkDistance(distance);
            showScore();
        });
    }

    function showScore() {
        _.setTextOf(elements.score, score);
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