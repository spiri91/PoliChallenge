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