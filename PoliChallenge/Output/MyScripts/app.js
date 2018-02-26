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

    let createPlace = ({ key, name, latitude, longitude, observations }) => {
        if (!key || !name || !latitude || !longitude || !observations) throw new Error("Invalid object creation");

        return new {
            key: key,
            name: name,
            latitude: latitude,
            longitude: longitude,
            observations: observations
        }
    };

    let createQuestion = ({ key, belongsTo, statement, answer1, answer2, answer3, correctAnswer }) => {
        if (!key || !belongsTo || !statement || !answer1 || !answer2 || !answer3 || !correctAnswer) throw new Error("Invalid object creation");

        return new {
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

        return new {
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