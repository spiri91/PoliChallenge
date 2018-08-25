/// <reference path="../../output/myscripts/app.js" />
"use strict";

var gameState = {
    inProgress: false,
    score: 0
};

(function (geo, geolib, _, storage, dealer, repo, guidGenerator, constants) {
    let elements = {
        distance: $("#distance"),
        score: $('#score'),
        tip: $('#tip'),
        startBtn: $('#start'),
        teamNameTxt: $('#teamName'),
        teamSelectionContainer: $('#teamNameSelection'),
        mainBody: $('#mainBody'),
        pulsatingElement: $('#searchForIT'),
        tipContainer: $('#tipContainer'),
        bottomBar: $('#bottomBar'),
        choseTeamNameBanner: $('#choseTeamNameBanner'),
        gameBody: $('#gameBody'),
        teamNameLabel: $('#teamNameLabel'),
        warmColdMessageContainer: $('#warmColdMessageContainer'),
        warmColdMessageText: $('#warmColdMessageText'),
        fireIcon: $('#fireIcon'),
        snowIcon: $('#snowIcon'),
        moveNextBtn: $('#moveNextBtn'),
        showMapBtn: $('#showMapBtn')
    }

    let places = [];
    let questions = [];
    var teamName = '';
    var regex = new RegExp("^[a-zA-Z0-9]*$");
    var lastKnownDistance;

    let objective = constants.game.ENTRY_POINT;

    function showDistance(distance) {
        _.setTextOf(elements.distance, distance);
    }

    function showWarmColdMessageContainer() {
        _.showElement(elements.warmColdMessageContainer);
    }

    var intervaledFunction = function (coords) {
        if (gameState.inProgress)
            return;

        if (allPlacesHaveBeenVisited()) {
            markHiScore(gameState.score);
            intervaledFunction = endOfGameFunction();
            return;
        }

        showTipAndPulsatingElementForNextPlace();
        showWarmColdMessageContainer();
        showMoveNextBtn();
        showTheMapButton();

        let distance = getDistanceAndShowIt(coords);

        if (checkDistance(distance))
            startGameOnPlace();
    }

    var markHiScore = function () {
        markHiScore = () => { };

        _.showSpinner()
            .then(() => {
                let score = repo.createHiScore({ key: guidGenerator.generate(), teamName: teamName, score: gameState.score, date: new Date() });
                return repo.post(repo.entities.hiScores, score, '');
            })
            .then(_.hideSpinner);
    }

    var endOfGameFunction = function () {
        _.confirm(constants.game.END_GAME_MESSAGE, () => location.reload());

        endOfGameFunction = () => { };
    }

    function showTipAndPulsatingElementForNextPlace() {
        let place = places[0];

        if (!place) return;

        let tip = place.observations;
        objective.latitude = place.latitude;
        objective.longitude = place.longitude;

        _.setTextOf(elements.tip, tip);
        _.showElement(elements.tipContainer);
        _.showElement(elements.pulsatingElement);
    }

    function allPlacesHaveBeenVisited() {
        return places.length === 0;
    }

    function hideWarmColdMessage() {
        _.hideElement(elements.warmColdMessageContainer);
    }

    function startGameOnPlace() {
        hideTipAndPulsationElement();
        hideMoveNextBtn();
        hideTheMapButton();
        hideWarmColdMessage();
        let place = getNextPlaceAndRemoveIt();
        let questionsForPlace = getQuestionsForPlace(place);

        gamePlay.start(questionsForPlace);
    }

    function hideTipAndPulsationElement() {
        _.hideElement(elements.tipContainer);
        _.hideElement(elements.pulsatingElement);
    }

    function getQuestionsForPlace(place) {
        let questionsForPlace = questions.filter((x) => x.for === place.key);

        return questionsForPlace;
    }

    function getNextPlaceAndRemoveIt() {
        let place = places.shift();

        return place;
    }

    function checkDistance(distance) {
        showWormColdMessage(distance);

        if (window.debugModeOn)
            return window.checkDistanceValue;

        return distance < constants.game.DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS;
    }

    function showWormColdMessage(distance) {
        if (!lastKnownDistance || (distance <= lastKnownDistance))
            showWormMessage();
        else
            showColdMessage();

        lastKnownDistance = distance;
    }

    function showWormMessage() {
        elements.warmColdMessageContainer.css('background-color', '#e2585a');
        _.setTextOf(elements.warmColdMessageText, 'getting warmer...');
        _.showElement(elements.fireIcon);
        _.hideElement(elements.snowIcon);
    }

    function showColdMessage() {
        elements.warmColdMessageContainer.css('background-color', '#56C3F0');
        _.setTextOf(elements.warmColdMessageText, 'getting colder...');
        _.showElement(elements.snowIcon);
        _.hideElement(elements.fireIcon);
    }

    function getDistanceAndShowIt(coords) {
        if (window.debugModeOn)
            return window.getDistanceValue;

        let currentLocation = {
            latitude: coords.coords.latitude,
            longitude: coords.coords.longitude
        }

        let distance = geolib.getDistance(objective, currentLocation);
        showDistance(distance);

        return distance;
    }

    function checkIfPlacesAreAvailable() {
        if (!places || places.length === 0) {
            _.error("Server unavaible :(");
            throw new Error('no places have been retrieved from the DB');
        }
    }

    function getPlacesAndQuestions() {
        places = dealer.shuffle(storage.get(storage.names.places));
        checkIfPlacesAreAvailable();
        addStartPointToPlaces();
        questions = storage.get(storage.names.questions);
    }

    function addStartPointToPlaces() {
        let startingPoint = constants.game.ENTRY_POINT;

        places.unshift(startingPoint);
    }

    function onErrorFunctionWhileGettingCoords() {
        _.error(constants.game.LOCATION_DISABLED_MESSAGE);
    }

    function showTeamName() {
        _.setTextOf(elements.teamNameLabel, teamName);
    }

    function start() {
        showTipAndPulsatingElementForNextPlace();
        showTeamName();
        geo.watchPosition(intervaledFunction, onErrorFunctionWhileGettingCoords);
    }

    function disableStartButton() {
        _.disableElements([elements.startBtn]);
    }

    function teamNameChanged(e) {
        let name = _.valueOf(elements.teamNameTxt);

        if (name.length === 1) showToolTipForTeamName();

        if (name.length > 3) {
            _.enableElements([elements.startBtn]);
            checkIfEnter(e);
        }
        else
            _.disableElements([elements.startBtn]);
    }

    function handleTooltipForMoveNextBtn() {
        elements.moveNextBtn.tooltip();
        elements.moveNextBtn.tooltip('show');
        setTimeout(() => {
            elements.moveNextBtn.tooltip('dispose');
            handleTooltipForMoveNextBtn = () => { };
        }, constants.game.SHOW_TOOLTIP_TIME_FOR_MOVE_NEXT_PLACE);
    }

    function showMoveNextBtn() {
        _.showElement(elements.moveNextBtn);

        handleTooltipForMoveNextBtn();
    }

    function startGame() {
        checkIfTeamNameIsTaken();

        getPlacesAndQuestions();
        hideChoseTeamBanner();
        showBottomBar();
        showMoveNextBtn();

        _.hideElement(elements.teamSelectionContainer);
        _.showElement(elements.mainBody);
        _.showElement(elements.pulsatingElement);
        teamName = _.valueOf(elements.teamNameTxt);

        start();
    }

    function showBottomBar() {
        _.setOpacityOfElement(elements.bottomBar, 1);
    }

    function checkIfTeamNameIsTaken() {
        let chosenTeamName = _.valueOf(elements.teamNameTxt).toUpperCase();
        let teamNamesInHiScores = storage.get(storage.names.scores)

        if (!teamNamesInHiScores) return;

        teamNamesInHiScores = teamNamesInHiScores.map((s) => s.teamName.toUpperCase());
        if (teamNamesInHiScores.indexOf(chosenTeamName) == -1)
            return;

        _.warning('Team name already taken :(');
        elements.teamNameTxt.focus();

        throw new Error('Bad team name');
    }

    function hideBottomPart() {
        _.hideElement(elements.choseTeamNameBanner);
        _.hideElement(elements.bottomBar);
        _.hideElement(elements.showMapBtn);
    }

    function showBottomPart() {
        setTimeout(() => {
            _.showElement(elements.bottomBar);
            _.showElement(elements.showMapBtn);
        }, 800);
    }

    function moveNextPlace() {
        getNextPlaceAndRemoveIt();
        showTipAndPulsatingElementForNextPlace();
    }

    function addEventToTeamNameTextBoxAndStartButtonAndMoveNext() {
        elements.teamNameTxt.keyup(teamNameChanged);
        elements.teamNameTxt.keypress(checkIfAlphaNumeric);
        elements.teamNameTxt.on('paste', checkPastedCode);
        elements.teamNameTxt.focus(hideBottomPart);
        elements.teamNameTxt.blur(showBottomPart);
        elements.startBtn.click(startGame);
        elements.moveNextBtn.click(moveNextPlace);
    }

    function checkPastedCode(e) {
        var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('text');

        if (regex.test(pastedData))
            return true;

        e.preventDefault();

        return false;
    }

    function checkIfAlphaNumeric(e) {
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str))
            return true;

        e.preventDefault();

        return false;
    }

    function checkIfEnter(e) {
        if (e.keyCode === 13) {
            elements.startBtn.click();
        }
    }

    function hideMainBodyOfGame() {
        _.hideElement(elements.mainBody);
    }

    function hidePulsatingElementAndBottomBar() {
        _.hideElement(elements.pulsatingElement);
        _.setOpacityOfElement(elements.bottomBar, 0.5);
    }

    function showChoseTeamBanner() {
        _.showElement(elements.choseTeamNameBanner);
    }

    function hideChoseTeamBanner() {
        _.hideElement(elements.choseTeamNameBanner);
    }

    function addFadeInOutBottomBarEffectOnScrool() {
        $(window).scroll(() => {
            if ($(window).scrollTop() < 15)
                elements.bottomBar.fadeIn();
            else
                elements.bottomBar.fadeOut();
        });
    }

    function showGameBody() {
        elements.gameBody.css('visibility', 'visible');
    }

    function hideMoveNextBtn() {
        _.hideElement(elements.moveNextBtn);
    }

    function addEventToShowMapBtn() {
        elements.showMapBtn.click(window.myMap);
    }

    function showTheMapButton() {
        _.showElement(elements.showMapBtn);
    }

    function hideTheMapButton() {
        _.hideElement(elements.showMapBtn);
    }

    function hideNavBtnIfNavigatorIsOffline() {
        if (false == navigator.onLine) _.hideElement(elements.showMapBtn);
    }

    function showToolTipForTeamName() {
        elements.teamNameTxt.tooltip();
        elements.teamNameTxt.tooltip('show');
        setTimeout(() => {
            elements.teamNameTxt.tooltip('dispose');
            showToolTipForTeamName = () => { };
        }, constants.game.SHOW_TOOLTIP_TIME_FOR_TEAM_NAME);
    }

    disableStartButton();
    addEventToTeamNameTextBoxAndStartButtonAndMoveNext();
    addEventToShowMapBtn();
    hideMainBodyOfGame();
    hideMoveNextBtn();
    hidePulsatingElementAndBottomBar();
    showChoseTeamBanner();
    addFadeInOutBottomBarEffectOnScrool();
    showGameBody();
    hideNavBtnIfNavigatorIsOffline();

    window.showTipAndPulsatingElementForNextPlace = showTipAndPulsatingElementForNextPlace;
})(geo, geolib, _, storage, dealer, repo, guidGenerator, constants);


var gamePlay = (function (dealer, _, constants) {
    let externalElement = {
        score: $('#score'),
    }

    let elements = {
        qContainer: $('#questionsContainer'),
        statement: $('#statement'),
        answer1: $('#answer1'),
        answer2: $('#answer2'),
        answer3: $('#answer3'),
        answer4: $('#answer4'),
        wrongAnsweredQuestionCount: $('#wrAnsQ'),
        timeLeftContainer: $('#timeLeftContainer'),
        timeLeft: $('#timeLeft')
    }

    function bindEvents() {
        elements.answer1.parent().click(checkAnswear);
        elements.answer2.parent().click(checkAnswear);
        elements.answer3.parent().click(checkAnswear);
        elements.answer4.parent().click(checkAnswear);
    }

    let wrongAnsweredQuestions = 0;
    let _questions = [];
    let currentQuestion = {};
    let timeLeft = constants.game.TIME_LEFT;

    let intervaledFunction = () => { };

    function start(questions) {
        gameState.inProgress = true;
        resetWrongAnsweredQuestions();
        _questions = questions;

        showTimeLeftContainer();
        setTimeLeft();
        startCounter();
        moveNext();
    }

    function showTimeLeftContainer() {
        _.showElement(elements.timeLeftContainer);
    }

    function setTimeLeft() {
        timeLeft = constants.game.TIME_LEFT;
    }

    function startCounter() {
        intervaledFunction = setInterval(checkTimeLeft, 1000);
    }

    function checkTimeLeft() {
        if (0 == timeLeft) {
            _.warning(constants.game.TIMES_UP_MESSAGE);
            moveNext();
        }
        else {
            timeLeft--;
            _.setTextOf(elements.timeLeft, timeLeft + "sec");
        }
    }

    function resetWrongAnsweredQuestions() {
        wrongAnsweredQuestions = 0;
        _.setTextOf(elements.wrongAnsweredQuestionCount, wrongAnsweredQuestions);
    }

    function resetStopWatch() {
        timeLeft = constants.game.TIME_LEFT;
    }

    function moveNext() {
        if (wrongAnsweredQuestions === constants.game.ALLOWED_WRONG_ANSWERED_QUESTIONS || _questions.length === 0) {
            stopGame();

            return;
        }

        currentQuestion = _questions.shift();
        resetStopWatch();
        showQuestion();
    }

    function stopGame() {
        gameState.inProgress = false;
        _.hideElement(elements.qContainer);
        _.hideElement(elements.timeLeftContainer);
        clearInterval(intervaledFunction);
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
        if (answerIsCorrect(text)) {
            gameState.score += constants.game.ANSWERED_QUESTION_POINTS;
            _.success(constants.game.CORRECT_ANSWER_MESSAGE);
        }
        else {
            wrongAnsweredQuestions++;
            _.warning(constants.game.WRONG_ANSWER_MESSAGE);
            navigator.vibrate(210);
        }

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
        start: start,
        moveNext: moveNext
    }

})(dealer, _, constants);

function myMap() {
    var mapCanvas = document.getElementById("le_map");
    var mapOptions = {
        center: new google.maps.LatLng(44.26, 26.03),
        zoom: 16
    };

    var map = new google.maps.Map(mapCanvas, mapOptions);
    var infoWindow = new google.maps.InfoWindow;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}