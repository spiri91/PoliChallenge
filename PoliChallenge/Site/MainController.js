/// <reference path="../output/myscripts/app.js" />

var mainApp = (function (entities, repo, storage, _) {
    var init = () => {
        return _.showSpinner().then(entities.fillAll(repo, storage)).then(_.hideSpinner);
    };

    return {
        init: init
    }
})(entities, repo, storage, _);

$(document).ready(mainApp.init)