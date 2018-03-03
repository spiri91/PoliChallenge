﻿/// <reference path="../output/myscripts/app.js" />

var mainApp = (function (entities, repo, storage) {
    var init = () => {
        return entities.fillAll(repo, storage);
    };

    return {
        init: init
    }
})(entities, repo, storage);

$(document).ready(mainApp.init)