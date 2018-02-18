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

    return {
        getAll: getAll,
        entities: routes
    };
})(call)
///// <reference path="../bower_components/navigo/lib/navigo.js" />
///// <reference path="../bower_components/jquery/dist/jquery.js" />

//var content = (($) => {
//    let getContent = (extension) => $.get("Site/" + extension).then((result) => result);
//    let setContent = (content) => {
//        alert(content);
//    }

//    return {
//        set: (extension) => {
//            getContent(extension).then(setContent);
//        }
//    }
//})(jQuery)

//var root = null;
//var useHash = true; 
//var hash = '#';
//var router = new Navigo(root, useHash, hash);

//route: router.on({
//    'questions': function () {
//        content.set("Questions/question.html");
//    },
//    'places': function () {
//        content.set("Places/place.html");
//    },
//    'hiScores': function () {
//        content.set("HiScores/hiScore.html");
//    },
//    '*': function () {
//        content.set("Game/game.html");
//    }
//}).resolve()
