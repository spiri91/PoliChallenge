/// <reference path="../bower_components/navigo/lib/navigo.js" />
/// <reference path="../bower_components/jquery/dist/jquery.js" />

var content = (($) => {
    //let getContent = (extension) => $.ajax({
    //    url: 'Site/' + extension,
    //    async: true,
    //    method: 'GET',
    //});
    let getContent = (extension) => $.get("Site/" + extension);
    let setContent = (content) => {
        $('#body').html(content);
    }

    let getHtml = (extension) => $.get("Site/" + extension + ".html");
    let getScript = (extension) => $.get("Site/" + extension + ".js");
    let appendScript = (script) => {
        var scriptElement = document.createElement("script");
        scriptElement.innerText = script;
        $('#body').append(scriptElement);
    }

    return {
        set: (extension) => {
            getHtml(extension).then(setContent).then(function () { return getScript(extension);}).then(appendScript);
        }
    }
})(jQuery);

var root = null;
var useHash = true; 
var hash = '#';
var router = new Navigo(root, useHash, hash);

route: router.on({
    'questions': function() {
        content.set("Questions/question");
    },
    'places': function() {
        content.set("Places/place");
    },
    'hiScores': function() {
        content.set("HiScores/hiScore");
    },
    '*': function() {
        content.set("Game/game");
    }
}).resolve();
