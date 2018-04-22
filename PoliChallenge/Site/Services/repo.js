/// <reference path="call.js" />

'use strict';
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