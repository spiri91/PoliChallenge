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
        teamNameLabel: $('#teamNameLabel')
    }

    let places = [];
    let questions = [];
    var teamName = '';
    var teamNameWarningShown = false;
    var regex = new RegExp("^[a-zA-Z0-9]*$");

    let objective = constants.game.ENTRY_POINT;

    function showDistance(distance) {
        _.setTextOf(elements.distance, distance);
    }

    var intervaledFunction = function(coords) {
        if (gameState.inProgress)
            return;

        if (allPlacesHaveBeenVisited()) {
            markHiScore(gameState.score);
            intervaledFunction = endOfGameFunction();
            return;
        }

        showTipAndPulsatingElementForNextPlace();
        let distance = getDistanceAndShowIt(coords);

        if (checkDistance(distance))
            startGameOnPlace();
    }

    var markHiScore = function() {
        markHiScore = () => { };

        _.showSpinner()
            .then(() => {
                let score = repo.createHiScore({ key: guidGenerator.generate(), teamName: teamName, score: gameState.score, date: new Date() });
                return repo.post(repo.entities.hiScores, score, '');
            })
            .then(_.hideSpinner);
    }

    var endOfGameFunction = function() {
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

    function startGameOnPlace() {
        hideTipAndPulsationElement();
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
        if (window.debugModeOn)
            return window.checkDistanceValue;

        return distance < constants.game.DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS;
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

    function showMinLenghtForTeamNameWarning() {
        _.warning(constants.game.TEAM_NAME_LENGTH_MESSAGE);
    }

    function teamNameChanged(e) {
        let name = _.valueOf(elements.teamNameTxt);

        if (name.length === 1 && (false == teamNameWarningShown)) {
            showMinLenghtForTeamNameWarning();
            teamNameWarningShown = true;
        }

        if (name.length > 3) {
            _.enableElements([elements.startBtn]);
            checkIfEnter(e);
        }
        else
            _.disableElements([elements.startBtn]);
    }
    function startGame() {
        checkIfTeamNameIsTaken();

        getPlacesAndQuestions();
        hideChoseTeamBanner();
        showBottomBar();

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
        let teamNamesInHiScores = storage.get(storage.names.scores).map((s) => s.teamName.toUpperCase());
        if (teamNamesInHiScores.indexOf(chosenTeamName) == -1)
            return;

        _.warning('Team name already taken :(');
        elements.teamNameTxt.focus();

        throw new Error('Bad team name');
    }

    function addEventToTeamNameTextBoxAndStartButton() {
        elements.teamNameTxt.keyup(teamNameChanged);
        elements.teamNameTxt.keypress(checkIfAlphaNumeric);
        elements.teamNameTxt.on('paste', checkPastedCode);
        elements.startBtn.click(startGame);
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

    disableStartButton();
    addEventToTeamNameTextBoxAndStartButton();
    hideMainBodyOfGame();
    hidePulsatingElementAndBottomBar();
    showChoseTeamBanner();
    addFadeInOutBottomBarEffectOnScrool();
    showGameBody();

    window.showTipAndPulsatingElementForNextPlace = showTipAndPulsatingElementForNextPlace;
})(geo, geolib, _, storage, dealer, repo, guidGenerator, constants);


var gamePlay = (function (dealer, _, constants) {
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
        if (wrongAnsweredQuestions === constants.game.ALLOWED_WRONG_ANSWERED_QUESTIONS || _questions.length === 0) {
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
        if (answerIsCorrect(text)) {
            gameState.score += constants.game.ANSWERED_QUESTION_POINTS;
            _.success(constants.game.CORRECT_ANSWER_MESSAGE);
        }
        else {
            wrongAnsweredQuestions++;
            _.warning(constants.game.WRONG_ANSWER_MESSAGE);
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
        start: start
    }
})(dealer, _, constants);