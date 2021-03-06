﻿var content = (($) => {
    let getContent = (extension) => $.get("Site/" + extension);
    let setContent = (content) => {
        $('#body').html(content);
    }

    let getHtml = (extension) => $.get("Site/" + extension + ".html");
    let getScript = (extension) => $.get("Site/" + extension + (globalDebug ? ".js" : "-min.js"));
    let getMapScript = () => {
        if (navigator.onLine)
            return $.getScript(constants.mapScriptAndKey);

        return null;
    }
   
    return {
        set: (extension) => {
            return getHtml(extension).then(setContent).then(() => getScript(extension));
        },
        getMapScript: getMapScript
    }
})(jQuery, constants);

var root = null;
var useHash = true; 
var hash = '#';
var router = new Navigo(root, useHash, hash);

route: router.on({
    'questions': function () {
        _.showSpinner().then(() => content.set("Questions/question")).then(_.hideSpinner);
        
    },
    'places': function () {
        _.showSpinner().then(() => content.set("Places/place")).then(_.hideSpinner);
    },
    'hiScores': function () {
        _.showSpinner().then(() => content.set("HiScores/hiScore")).then(_.hideSpinner);
    },
    '*': function () {
        _.showSpinner().then(() => content.set("Game/game")).then(content.getMapScript).then(_.hideSpinner);
    }
}).resolve();
