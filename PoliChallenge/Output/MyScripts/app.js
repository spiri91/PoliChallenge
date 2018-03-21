/// <reference path="../../bower_components/jquery/dist/jquery.js" />
var call = (function () {
    function makeCall({ to, action = 'GET', body = null, token = '' }) {
        return $.ajax({
            url: to,
            headers: { 'Authorization': token },
            method: action,
            dataType: 'json',
            data: body,
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
})();
var dealer = (function () {
    var shuffle = function (array) {
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
        var promises = [
            () => repo.getAll(entities.places).then((result) => storage.set(storage.names.places, result)),
            () => repo.getAll(entities.questions).then((result) => storage.set(storage.names.questions, result)),
            () => repo.getAll(entities.hiScores).then((result) => storage.set(storage.names.scores, result)),
        ]

        return Promise.all(promises);
    }

    return {
        fillAll: fillAll
    }
})()
var geo = (function () {
    function getCoords(successFunction, errorFunction) {
        return new Promise((successFunction, errorFunction) => navigator.geolocation.getCurrentPosition(successFunction, errorFunction));
    }

    return {
        get: getCoords
    }
})();
var guidGenerator = (function() {
    return {
        generate : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    }
})();
var _ = (function () {
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
        if (message.status < 300) {
            $.notify(message.statusText, 'success')
            return;
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

    var props = {
        disabled: 'disabled'
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
        jqueryElement.css('display', 'none')
    }

    function showElement(jqueryElement) {
        jqueryElement.css('display', 'block')
    }

    function setTextOf(element, text) {
        element.text(text);
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
    }
})();
/// <reference path="call.js" />

'use strict';
var repo = (function () {
    const routes = {
        places: 'api/places',
        questions: 'api/questions',
        hiScores: 'api/scores'
    };

    let getAll = (route) => {
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
        createHiScore: createHiScore,
    };
})(call)
/// <reference path="../bower_components/navigo/lib/navigo.js" />
/// <reference path="../bower_components/jquery/dist/jquery.js" />

var content = (($) => {
    let getContent = (extension) => $.get("Site/" + extension).then((result) => result);
    let setContent = (content) => {
        $('#body').html(content);
    }

    return {
        set: (extension) => {
            getContent(extension).then(setContent);
        }
    }
})(jQuery)

var root = null;
var useHash = true; 
var hash = '#';
var router = new Navigo(root, useHash, hash);

route: router.on({
    'questions': function () {
        content.set("Questions/question.html");
    },
    'places': function () {
        content.set("Places/place.html");
    },
    'hiScores': function () {
        content.set("HiScores/hiScore.html");
    },
    '*': function () {
        content.set("Game/game.html");
    }
}).resolve()

var storage = (function () {
    var set = (name, object) => {
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
            questions: 'questions'
        }
    }
})()