/// <reference path="../output/myscripts/app.js" />

// for debugging
window.debugModeOn = false;
window.checkDistanceValue = false;
window.getDistanceValue = 100;

window.onerror = function (message, file, line, col, error) {
    console.log(error);
    return false;
};

var mainApp = (function (entities, repo, storage, _) {
    _.showSpinner();
    entities.fillAll(repo, storage)

    let howToPlayBtn = $('#howToPlay');
    let body = $('#body');
    let adminBtn = $('#addItem');

    var init = () => {
        showHowToPlayModal();
        chekIfUrlContainsAdmin();
        _.hideSpinner();
        addColapseNavbarEvent();
    };

    function addColapseNavbarEvent() {
        body.click(function (event) {
            let btnColapse = $('.navbar-toggler');
            if (btnColapse.length > 0) {
                let collapsed = btnColapse[0].getAttribute('aria-expanded');
                if (collapsed == 'true') btnColapse[0].click();
            }
        });
    }

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