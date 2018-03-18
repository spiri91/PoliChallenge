﻿/// <reference path="../../output/myscripts/app.js" />
/// <reference path="../../bower_components/moment/min/moment.min.js" />
"use strict";

(function (repo, _, storage, entities) {
    let elements = {
        tBody : $('#tableBody')
    }

    function init() {
        let hiScores = getHiScores();
        displayHiScores(hiScores);
    }

    function displayHiScores(hiScores) {
        //<tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>
        let index = 1;
        for (let i in hiScores) {
            let score = hiScores[i];
            elements.tBody.append("<tr><th scope='row'>" + index + "</th><td>" + score.teamName + "</td><td>" + formatDate(score.date) + "</td><td>" + score.score + "</td></tr > ");
            index++;
        }
    }

    function formatDate(date) {
        return moment(date).format("DD/MM/YYYY hh:mm")
    }

    function getHiScores() {
        let hiScores = storage.get(storage.names.scores);

        return hiScores.sort((x, y) => x.score < y.score);
    }

    init();
})(repo, _, storage, entities)