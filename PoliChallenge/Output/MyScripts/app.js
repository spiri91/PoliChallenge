var constants = (function () {
    return {
        mapScriptAndKey: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBsDpmZ_ZI7IoZt1GafAQeU52z2JV9R-zY&callback=myMap',
        game: {
            ENTRY_POINT: {
                name: 'Starting Point',
                observations: 'Entry point to Politehnica Park from Iuliu Maniu',
                latitude: 44.4349506,
                longitude: 26.0450246
            },
            END_GAME_MESSAGE: 'You just finished the game. :) Start over?',
            ALLOWED_WRONG_ANSWERED_QUESTIONS: 2,
            ANSWERED_QUESTION_POINTS: 10,
            DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS: 25,
            CORRECT_ANSWER_MESSAGE: 'Correct !!',
            WRONG_ANSWER_MESSAGE: 'Wrong :(',
            TEAM_NAME_LENGTH_MESSAGE: 'Team name must be \n at least 4 characters long',
            LOCATION_DISABLED_MESSAGE: 'Please enable location \n service and reload \n the application!',
            TIME_LEFT: 120,
            TIMES_UP_MESSAGE: "Time's up. Sorry :(",
            SHOW_TOOLTIP_TIME_FOR_MOVE_NEXT_PLACE: 5000,
            SHOW_TOOLTIP_TIME_FOR_TEAM_NAME: 4000
        },
        questions: {
            QUESTIONS_SELECT_PLACE: 'Select a place to edit a question of it',
            QUESTIONS_SELECT_QUESTION_FOR_EDIT: 'Select the question you want to edit',
            DELETE_QUESTION: 'Delete this question?'
        },
        places: {
            SELECT_PLACE: 'Select a place for edit or delete'
        },
        hiScores: {
            DATE_FORMAT: 'DD/MM/YYYY hh:mm'
        },
        messages: {
            MISSING_TOKEN: 'Token is missing :(',
            DELETED_ITEM: 'Item deleted.',
            CREATED_ITEM: 'Item created.',
            UPDATED_ITEM: 'Item updated.'
        },
    }
})()
var call = (function () {
    function makeCall({ to, action = 'GET', body = null, token = '' }) {
        return $.ajax({
            url: to,
            async: true,
            headers: { 'Authorization': token },
            method: action,
            dataType: 'json',
            data: body
        });
    }

    return {
        actions: {
            get: 'GET',
            post: 'POST',
            delete: 'DELETE',
            put: 'PUT'
        },

        ajax: makeCall
    }
})()
var dealer = (function () {
    var shuffle = function (array) {
        if (!array)
            return;

        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return {
        shuffle: shuffle
    }
})()
var entities = (function () {
    var fillAll = (repo, storage) => {
        return Promise.all([
            repo.getAll(repo.entities.places, storage, storage.names.places).then((result) => storage.set(storage.names.places, result)),
            repo.getAll(repo.entities.questions, storage, storage.names.questions).then((result) => storage.set(storage.names.questions, result)),
            repo.getAll(repo.entities.hiScores, storage, storage.names.scores).then((result) => storage.set(storage.names.scores, result)),
        ]);
    }

    return {
        fillAll: fillAll
    }
})()
var geo = (function () {
    function getCoords(successFunction, errorFunction) {
        return new Promise((successFunction, errorFunction) => navigator.geolocation.getCurrentPosition(successFunction, errorFunction));
    }

    function watchPosition(successFunction, onErrorFunction) {
        navigator.geolocation.watchPosition(successFunction, onErrorFunction);
    }

    return {
        get: getCoords,
        watchPosition: watchPosition
    }
})()
var guidGenerator = (function() {
    return {
        generate : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
})()
var _ = (function () {
    var props = {
        disabled: 'disabled'
    }

    function valueOf(element) {
        checkElement(element);

        return element.val();
    }

    function setValueOf(element, value) {
        checkElement(element);

        element.val(value);
    }

    function checkElement(element) {
        if (!element)
            throw new Error("Invalid element");

        if (element.length === 0)
            throw new Error("Element not found");
    }

    function success(message) {
        message = message || "Created";

        $.notify(message, "success");
    }

    function setSelectedIndexOfSelectElement(element, index) {
        element.attr('selectedIndex', index);
    }

    function warning(message) {
        $.notify(message, "warning");
    }

    function error(message) {
        if (message.status == 0) {
            $.notify('No internet :(', 'error');
            return;
        }

        if (message.status < 300) {
            $.notify(message.statusText, 'success');
            return true;
        }

        if (message.statusText)
            message = message.statusText;
        else
            message = message || "Error :( ";

        $.notify(message, "error");
    }

    function findInArray(array, value) {
        for (let i in array)
            for (let j in array[i])
                if (array[i][j] === value)
                    return array[i];

        return null;
    }

    function disableElements(elementsArray) {
        for (let i in elementsArray)
            elementsArray[i].prop(props.disabled, true);
    }

    function enableElements(elementsArray) {
        for (let i in elementsArray)
            elementsArray[i].prop(props.disabled, false);
    }

   
    function showSpinner() {
        return new Promise((resolve) => {
            let element = $('body').addClass("loading");
            resolve(element);
        });
    }

    function hideSpinner() {
        return new Promise((resolve) => {
            let element = $('body').removeClass("loading");
            resolve(element);
        });
    }

    function confirm(contentString,  okFunction) {
        $.confirm({
            title: 'Confirm!',
            content: contentString,
            buttons: {
                confirm: () => okFunction(),
                cancel: () => { }
            }
        });
    }

    function hideElement(jqueryElement) {
        jqueryElement.css('display', 'none');
    }

    function showElement(jqueryElement) {
        jqueryElement.css('display', 'block');
    }

    function setTextOf(element, text) {
        element.text(text);
    }

    function setOpacityOfElement(jqueryElement, opacityLevel) {
        jqueryElement.css('opacity', opacityLevel);
    }

    return {
        valueOf: valueOf,
        setValueOf: setValueOf,
        success: success,
        error: error,
        warning: warning,
        findInArray: findInArray,
        disableElements: disableElements,
        enableElements: enableElements,
        showSpinner: showSpinner,
        hideSpinner: hideSpinner,
        confirm: confirm,
        setSelectedIndexOfSelectElement: setSelectedIndexOfSelectElement,
        setTextOf: setTextOf,
        hideElement: hideElement,
        showElement: showElement,
        setOpacityOfElement: setOpacityOfElement
    }
})()
var repo = (function () {
    const routes = {
        places: 'api/places',
        questions: 'api/questions',
        hiScores: 'api/scores'
    };

    let getAll = (route, storageService, storageNameForObject) => {
        if (!navigator.onLine)
            return $.Deferred().resolve(storageService.get(storageNameForObject));

        return call.ajax({
            to: route,
            action: call.actions.get
        });
    };

    let put = (route, object, token) => {
        return call.ajax({
            to: route,
            action: call.actions.put,
            token: token,
            body: object
        });
    }

    let post = (route, object, token) => {
        return call.ajax({
            to: route,
            action: call.actions.post,
            token: token,
            body: object
        });
    }

    let _delete = (route, id, token) => {
        return call.ajax({
            to: route + "/" + id,
            action: call.actions.delete,
            token: token,
        });
    }

    let createPlace = ({ key, name, latitude, longitude, observations }) => {
        if (!key || !name || !latitude || !longitude || !observations) throw new Error("Invalid object creation");

        return {
            key: key,
            name: name,
            latitude: latitude,
            longitude: longitude,
            observations: observations
        }
    };

    let createQuestion = ({ key, belongsTo, statement, answer1, answer2, answer3, correctAnswer }) => {
        if (!key || !belongsTo || !statement || !answer1 || !answer2 || !answer3 || !correctAnswer) throw new Error("Invalid object creation");

        return {
            key: key,
            for: belongsTo,
            statement: statement,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            correctAnswer: correctAnswer
        }
    };

    let createHiScore = ({ key, teamName, score, date }) => {
        if (!key || !teamName || !score || !date) throw new Error("Invalid object creation");

        return {
            key: key,
            teamName: teamName, 
            score: score,
            date: date
        }
    };

    return {
        getAll: getAll,
        put: put,
        post: post,
        delete: _delete,
        entities: routes,
        createPlace: createPlace, 
        createQuestion: createQuestion,
        createHiScore: createHiScore
    };
})(call)
var content = (($) => {
    let getContent = (extension) => $.get("Site/" + extension);
    let setContent = (content) => {
        $('#body').html(content);
    }

    let getHtml = (extension) => $.get("Site/" + extension + ".html");
    let getScript = (extension) => $.get("Site/" + extension + (globalDebug ? ".js" : "-min.js"));
    let getMapScript = () => {
        if (navigator.onLine)
            return $.getScript(constants.mapScriptAndKey);

        return null;
    }
   
    return {
        set: (extension) => {
            return getHtml(extension).then(setContent).then(() => getScript(extension));
        },
        getMapScript: getMapScript
    }
})(jQuery, constants);

var root = null;
var useHash = true; 
var hash = '#';
var router = new Navigo(root, useHash, hash);

route: router.on({
    'questions': function () {
        _.showSpinner().then(() => content.set("Questions/question")).then(_.hideSpinner);
        
    },
    'places': function () {
        _.showSpinner().then(() => content.set("Places/place")).then(_.hideSpinner);
    },
    'hiScores': function () {
        _.showSpinner().then(() => content.set("HiScores/hiScore")).then(_.hideSpinner);
    },
    '*': function () {
        _.showSpinner().then(() => content.set("Game/game")).then(content.getMapScript).then(_.hideSpinner);
    }
}).resolve();

var storage = (function () {
    var set = (name, object) => {
        localStorage.removeItem(name);

        let obj = JSON.stringify(object);
        localStorage.setItem(name, obj);
    }

    var get = (name) => {
        let obj = localStorage.getItem(name);

        return JSON.parse(obj);
    }

    return {
        set: set,
        get: get,
        names: {
            scores: 'scores',
            places: 'places',
            questions: 'questions',
            howToPlay: 'howToPlay'
        }
    }
})()