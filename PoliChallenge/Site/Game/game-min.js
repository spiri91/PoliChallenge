"use strict";var gameState={inProgress:!1,score:0};!function(e,t,n,a,o,r,i,s){let m={distance:$("#distance"),score:$("#score"),tip:$("#tip"),startBtn:$("#start"),teamNameTxt:$("#teamName"),teamSelectionContainer:$("#teamNameSelection"),mainBody:$("#mainBody"),pulsatingElement:$("#searchForIT"),tipContainer:$("#tipContainer"),bottomBar:$("#bottomBar"),choseTeamNameBanner:$("#choseTeamNameBanner"),gameBody:$("#gameBody"),teamNameLabel:$("#teamNameLabel"),warmColdMessageContainer:$("#warmColdMessageContainer"),warmColdMessageText:$("#warmColdMessageText"),fireIcon:$("#fireIcon"),snowIcon:$("#snowIcon")},l=[],c=[];var u,f="",g=!1,d=new RegExp("^[a-zA-Z0-9]*$");let w=s.game.ENTRY_POINT;var E=function(e){if(gameState.inProgress)return;if(0===l.length)return T(gameState.score),void(E=h());C(),n.showElement(m.warmColdMessageContainer),function(e){return function(e){!u||e<=u?(m.warmColdMessageContainer.css("background-color","#e2585a"),n.setTextOf(m.warmColdMessageText,"getting warmer..."),n.showElement(m.fireIcon),n.hideElement(m.snowIcon)):(m.warmColdMessageContainer.css("background-color","#56C3F0"),n.setTextOf(m.warmColdMessageText,"getting colder..."),n.showElement(m.snowIcon),n.hideElement(m.fireIcon)),u=e}(e),window.debugModeOn?window.checkDistanceValue:e<s.game.DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS}(function(e){if(window.debugModeOn)return window.getDistanceValue;let a={latitude:e.coords.latitude,longitude:e.coords.longitude},o=t.getDistance(w,a);return function(e){n.setTextOf(m.distance,e)}(o),o}(e))&&function(){n.hideElement(m.tipContainer),n.hideElement(m.pulsatingElement),n.hideElement(m.warmColdMessageContainer);let e=function(e){return c.filter(t=>t.for===e.key)}(l.shift());gamePlay.start(e)}()},T=function(){T=(()=>{}),n.showSpinner().then(()=>{let e=r.createHiScore({key:i.generate(),teamName:f,score:gameState.score,date:new Date});return r.post(r.entities.hiScores,e,"")}).then(n.hideSpinner)},h=function(){n.confirm(s.game.END_GAME_MESSAGE,()=>location.reload()),h=(()=>{})};function C(){let e=l[0];if(!e)return;let t=e.observations;w.latitude=e.latitude,w.longitude=e.longitude,n.setTextOf(m.tip,t),n.showElement(m.tipContainer),n.showElement(m.pulsatingElement)}function N(){l=o.shuffle(a.get(a.names.places)),function(){if(!l||0===l.length)throw n.error("Server unavaible :("),new Error("no places have been retrieved from the DB")}(),function(){let e=s.game.ENTRY_POINT;l.unshift(e)}(),c=a.get(a.names.questions)}function S(){n.error(s.game.LOCATION_DISABLED_MESSAGE)}function O(){C(),n.setTextOf(m.teamNameLabel,f),e.watchPosition(E,S)}function p(e){let t=n.valueOf(m.teamNameTxt);1===t.length&&0==g&&(n.warning(s.game.TEAM_NAME_LENGTH_MESSAGE),g=!0),t.length>3?(n.enableElements([m.startBtn]),function(e){13===e.keyCode&&m.startBtn.click()}(e)):n.disableElements([m.startBtn])}function x(){!function(){let e=n.valueOf(m.teamNameTxt).toUpperCase();if(-1==a.get(a.names.scores).map(e=>e.teamName.toUpperCase()).indexOf(e))return;throw n.warning("Team name already taken :("),m.teamNameTxt.focus(),new Error("Bad team name")}(),N(),n.hideElement(m.choseTeamNameBanner),n.setOpacityOfElement(m.bottomBar,1),n.hideElement(m.teamSelectionContainer),n.showElement(m.mainBody),n.showElement(m.pulsatingElement),f=n.valueOf(m.teamNameTxt),O()}function B(){n.hideElement(m.choseTeamNameBanner),n.hideElement(m.bottomBar)}function _(){setTimeout(()=>n.showElement(m.bottomBar),1e3)}function b(e){var t=(e.clipboardData||e.originalEvent.clipboardData||window.clipboardData).getData("text");return!!d.test(t)||(e.preventDefault(),!1)}function A(e){var t=String.fromCharCode(e.charCode?e.charCode:e.which);return!!d.test(t)||(e.preventDefault(),!1)}n.disableElements([m.startBtn]),m.teamNameTxt.keyup(p),m.teamNameTxt.keypress(A),m.teamNameTxt.on("paste",b),m.teamNameTxt.focus(B),m.teamNameTxt.blur(_),m.startBtn.click(x),n.hideElement(m.mainBody),n.hideElement(m.pulsatingElement),n.setOpacityOfElement(m.bottomBar,.5),n.showElement(m.choseTeamNameBanner),$(window).scroll(()=>{$(window).scrollTop()<15?m.bottomBar.fadeIn():m.bottomBar.fadeOut()}),m.gameBody.css("visibility","visible"),window.showTipAndPulsatingElementForNextPlace=C}(geo,geolib,_,storage,dealer,repo,guidGenerator,constants);var gamePlay=function(e,t,n){let a={score:$("#score")},o={qContainer:$("#questionsContainer"),statement:$("#statement"),answer1:$("#answer1"),answer2:$("#answer2"),answer3:$("#answer3"),answer4:$("#answer4"),wrongAnsweredQuestionCount:$("#wrAnsQ"),timeLeftContainer:$("#timeLeftContainer"),timeLeft:$("#timeLeft")};let r=0,i=[],s={},m=n.game.TIME_LEFT,l=()=>{};function c(){0==m?(t.warning(n.game.TIMES_UP_MESSAGE),u()):(m--,t.setTextOf(o.timeLeft,m))}function u(){if(r===n.game.ALLOWED_WRONG_ANSWERED_QUESTIONS||0===i.length)return gameState.inProgress=!1,t.hideElement(o.qContainer),t.hideElement(o.timeLeftContainer),void clearInterval(l);s=i.shift(),m=n.game.TIME_LEFT,function(){let n=s,a=[n.answer1,n.answer2,n.answer3,n.correctAnswer];!function(e,n){(function(e,n){t.setTextOf(o.statement,e),t.setTextOf(o.answer1,n[0]),t.setTextOf(o.answer2,n[1]),t.setTextOf(o.answer3,n[2]),t.setTextOf(o.answer4,n[3])})(e,n),t.showElement(o.qContainer)}(n.statement,e.shuffle(a))}()}function f(e){!function(e){return e===s.correctAnswer}(e.target.innerText)?(r++,t.warning(n.game.WRONG_ANSWER_MESSAGE)):(gameState.score+=n.game.ANSWERED_QUESTION_POINTS,t.success(n.game.CORRECT_ANSWER_MESSAGE)),t.setTextOf(a.score,gameState.score),t.setTextOf(o.wrongAnsweredQuestionCount,r),u()}return o.answer1.click(f),o.answer2.click(f),o.answer3.click(f),o.answer4.click(f),{start:function(e){gameState.inProgress=!0,r=0,t.setTextOf(o.wrongAnsweredQuestionCount,r),i=e,t.showElement(o.timeLeftContainer),m=n.game.TIME_LEFT,l=setInterval(c,1e3),u()}}}(dealer,_,constants);