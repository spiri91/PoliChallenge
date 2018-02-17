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
