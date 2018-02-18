/// <reference path="../output/myscripts/app.js" />

var mainApp = (function (repo, entities) {
    var init = () => {
        repo.getAll(entities.places).then(storeInLocalStorage);
        repo.getAll(entities.questions).then(storeInLocalStorage);
        repo.getAll(entities.hiScores).then(storeInLocalStorage);
    };

    function storeInLocalStorage(value) {
        debugger;
    }

    $(document).ready(init);
})(repo, repo.entities);