/// <reference path="../output/myscripts/app.js" />

// for debugging
window.debugModeOn = false;
window.checkDistanceValue = false;
window.getDistanceValue = 100;

window.onerror = function (message, file, line, col, error) {
    // TODO send error message to server;
    return false;
};

var mainApp = (function (entities, repo, storage, _) {
    let howToPlayBtn = $('#howToPlay');
    let body = $('#body');
    let adminBtn = $('#addItem');

    var init = () => {
        return _.showSpinner()
            .then(entities.fillAll(repo, storage))
            .then(_.hideSpinner)
            .then(showHowToPlayModal)
            .then(chekIfUrlContainsAdmin)
    };

    function chekIfUrlContainsAdmin() {
        let urlHash = window.location.hash.substr(1);

        if (urlHash.toUpperCase().indexOf('ADMIN') > -1)
            _.showElement(adminBtn);
        else
            _.hideElement(adminBtn);
    }

    function showHowToPlayModal() {
        let modalWasShownBefore = storage.get(storage.names.howToPlay);
        if (modalWasShownBefore == 1) return;

        storage.set(storage.names.howToPlay, 1);
        howToPlayBtn.click();
    }

    return {
        init: init
    }
})(entities, repo, storage, _);

$(document).ready(mainApp.init);