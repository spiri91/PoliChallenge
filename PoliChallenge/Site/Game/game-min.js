"use strict";var gameState={inProgress:!1,score:0};!function(e,t,n,a,o,r,i,s){let m={distance:$("#distance"),score:$("#score"),tip:$("#tip"),startBtn:$("#start"),teamNameTxt:$("#teamName"),teamSelectionContainer:$("#teamNameSelection"),mainBody:$("#mainBody"),pulsatingElement:$("#searchForIT"),tipContainer:$("#tipContainer"),bottomBar:$("#bottomBar"),choseTeamNameBanner:$("#choseTeamNameBanner"),gameBody:$("#gameBody"),teamNameLabel:$("#teamNameLabel"),warmColdMessageContainer:$("#warmColdMessageContainer"),warmColdMessageText:$("#warmColdMessageText"),fireIcon:$("#fireIcon"),snowIcon:$("#snowIcon"),moveNextBtn:$("#moveNextBtn"),showMapBtn:$("#showMapBtn")},l=[],c=[];var u,g="",f=!1,d=new RegExp("^[a-zA-Z0-9]*$");let w=s.game.ENTRY_POINT;var E=function(e){if(gameState.inProgress)return;if(0===l.length)return h(gameState.score),void(E=T());p(),n.showElement(m.warmColdMessageContainer),v(),function(e){return function(e){!u||e<=u?(m.warmColdMessageContainer.css("background-color","#e2585a"),n.setTextOf(m.warmColdMessageText,"getting warmer..."),n.showElement(m.fireIcon),n.hideElement(m.snowIcon)):(m.warmColdMessageContainer.css("background-color","#56C3F0"),n.setTextOf(m.warmColdMessageText,"getting colder..."),n.showElement(m.snowIcon),n.hideElement(m.fireIcon)),u=e}(e),window.debugModeOn?window.checkDistanceValue:e<s.game.DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS}(function(e){if(window.debugModeOn)return window.getDistanceValue;let a={latitude:e.coords.latitude,longitude:e.coords.longitude},o=t.getDistance(w,a);return function(e){n.setTextOf(m.distance,e)}(o),o}(e))&&function(){n.hideElement(m.tipContainer),n.hideElement(m.pulsatingElement),y(),n.hideElement(m.warmColdMessageContainer);let e=function(e){return c.filter(t=>t.for===e.key)}(C());gamePlay.start(e)}()},h=function(){h=(()=>{}),n.showSpinner().then(()=>{let e=r.createHiScore({key:i.generate(),teamName:g,score:gameState.score,date:new Date});return r.post(r.entities.hiScores,e,"")}).then(n.hideSpinner)},T=function(){n.confirm(s.game.END_GAME_MESSAGE,()=>location.reload()),T=(()=>{})};function p(){let e=l[0];if(!e)return;let t=e.observations;w.latitude=e.latitude,w.longitude=e.longitude,n.setTextOf(m.tip,t),n.showElement(m.tipContainer),n.showElement(m.pulsatingElement)}function C(){return l.shift()}function N(){l=o.shuffle(a.get(a.names.places)),function(){if(!l||0===l.length)throw n.error("Server unavaible :("),new Error("no places have been retrieved from the DB")}(),function(){let e=s.game.ENTRY_POINT;l.unshift(e)}(),c=a.get(a.names.questions)}function O(){n.error(s.game.LOCATION_DISABLED_MESSAGE)}function S(){p(),n.setTextOf(m.teamNameLabel,g),e.watchPosition(E,O)}function x(e){let t=n.valueOf(m.teamNameTxt);1===t.length&&0==f&&(n.warning(s.game.TEAM_NAME_LENGTH_MESSAGE),f=!0),t.length>3?(n.enableElements([m.startBtn]),function(e){13===e.keyCode&&m.startBtn.click()}(e)):n.disableElements([m.startBtn])}function B(){m.moveNextBtn.tooltip(),m.moveNextBtn.tooltip("show"),setTimeout(()=>{m.moveNextBtn.tooltip("dispose"),B=(()=>{})},s.game.SHOW_TOOLTIP_TIME_FOR_MOVE_NEXT_PLACE)}function v(){n.showElement(m.moveNextBtn),B()}function _(){!function(){let e=n.valueOf(m.teamNameTxt).toUpperCase();if(-1==a.get(a.names.scores).map(e=>e.teamName.toUpperCase()).indexOf(e))return;throw n.warning("Team name already taken :("),m.teamNameTxt.focus(),new Error("Bad team name")}(),N(),n.hideElement(m.choseTeamNameBanner),n.setOpacityOfElement(m.bottomBar,1),v(),n.hideElement(m.teamSelectionContainer),n.showElement(m.mainBody),n.showElement(m.pulsatingElement),g=n.valueOf(m.teamNameTxt),S()}function M(){n.hideElement(m.choseTeamNameBanner),n.hideElement(m.bottomBar)}function b(){setTimeout(()=>n.showElement(m.bottomBar),1e3)}function A(){C(),p()}function I(e){var t=(e.clipboardData||e.originalEvent.clipboardData||window.clipboardData).getData("text");return!!d.test(t)||(e.preventDefault(),!1)}function L(e){var t=String.fromCharCode(e.charCode?e.charCode:e.which);return!!d.test(t)||(e.preventDefault(),!1)}function y(){n.hideElement(m.moveNextBtn)}n.disableElements([m.startBtn]),m.teamNameTxt.keyup(x),m.teamNameTxt.keypress(L),m.teamNameTxt.on("paste",I),m.teamNameTxt.focus(M),m.teamNameTxt.blur(b),m.startBtn.click(_),m.moveNextBtn.click(A),m.showMapBtn.click(window.myMap),n.hideElement(m.mainBody),y(),n.hideElement(m.pulsatingElement),n.setOpacityOfElement(m.bottomBar,.5),n.showElement(m.choseTeamNameBanner),$(window).scroll(()=>{$(window).scrollTop()<15?m.bottomBar.fadeIn():m.bottomBar.fadeOut()}),m.gameBody.css("visibility","visible"),0==navigator.onLine&&n.hideElement(m.showMapBtn),window.showTipAndPulsatingElementForNextPlace=p}(geo,geolib,_,storage,dealer,repo,guidGenerator,constants);var gamePlay=function(e,t,n){let a={score:$("#score")},o={qContainer:$("#questionsContainer"),statement:$("#statement"),answer1:$("#answer1"),answer2:$("#answer2"),answer3:$("#answer3"),answer4:$("#answer4"),wrongAnsweredQuestionCount:$("#wrAnsQ"),timeLeftContainer:$("#timeLeftContainer"),timeLeft:$("#timeLeft")};let r=0,i=[],s={},m=n.game.TIME_LEFT,l=()=>{};function c(){0==m?(t.warning(n.game.TIMES_UP_MESSAGE),u()):(m--,t.setTextOf(o.timeLeft,m+"sec"))}function u(){if(r===n.game.ALLOWED_WRONG_ANSWERED_QUESTIONS||0===i.length)return gameState.inProgress=!1,t.hideElement(o.qContainer),t.hideElement(o.timeLeftContainer),void clearInterval(l);s=i.shift(),m=n.game.TIME_LEFT,function(){let n=s,a=[n.answer1,n.answer2,n.answer3,n.correctAnswer];!function(e,n){(function(e,n){t.setTextOf(o.statement,e),t.setTextOf(o.answer1,n[0]),t.setTextOf(o.answer2,n[1]),t.setTextOf(o.answer3,n[2]),t.setTextOf(o.answer4,n[3])})(e,n),t.showElement(o.qContainer)}(n.statement,e.shuffle(a))}()}function g(e){!function(e){return e===s.correctAnswer}(e.target.innerText)?(r++,t.warning(n.game.WRONG_ANSWER_MESSAGE),navigator.vibrate(210)):(gameState.score+=n.game.ANSWERED_QUESTION_POINTS,t.success(n.game.CORRECT_ANSWER_MESSAGE)),t.setTextOf(a.score,gameState.score),t.setTextOf(o.wrongAnsweredQuestionCount,r),u()}return o.answer1.click(g),o.answer2.click(g),o.answer3.click(g),o.answer4.click(g),{start:function(e){gameState.inProgress=!0,r=0,t.setTextOf(o.wrongAnsweredQuestionCount,r),i=e,t.showElement(o.timeLeftContainer),m=n.game.TIME_LEFT,l=setInterval(c,1e3),u()},moveNext:u}}(dealer,_,constants);function myMap(){var e=$("#le_map"),t={center:new google.maps.LatLng(44.26,26.03),zoom:16},n=new google.maps.Map(e,t),a=new google.maps.InfoWindow;navigator.geolocation?navigator.geolocation.getCurrentPosition(function(e){var t={lat:e.coords.latitude,lng:e.coords.longitude};a.setPosition(t),a.setContent("You are here."),a.open(n),n.setCenter(t)},function(){handleLocationError(!0,a,n.getCenter())}):handleLocationError(!1,a,n.getCenter())}function handleLocationError(e,t,n){t.setPosition(n),t.setContent(e?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation."),t.open(map)}