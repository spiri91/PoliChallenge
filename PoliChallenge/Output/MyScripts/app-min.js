var constants={mapScriptAndKey:"https://maps.googleapis.com/maps/api/js?key=AIzaSyBsDpmZ_ZI7IoZt1GafAQeU52z2JV9R-zY&callback=myMap",game:{ENTRY_POINT:{name:"Starting Point",observations:"Entry point to Politehnica Park from Iuliu Maniu",latitude:44.434543,longitude:26.048769},END_GAME_MESSAGE:"You just finished the game. :) Start over?",ALLOWED_WRONG_ANSWERED_QUESTIONS:2,ANSWERED_QUESTION_POINTS:10,DISTANCE_TO_OBJECTIVE_WHEN_GAME_STARTS:15,CORRECT_ANSWER_MESSAGE:"Correct !!",WRONG_ANSWER_MESSAGE:"Wrong :(",TEAM_NAME_LENGTH_MESSAGE:"Team name must be \n at least 4 characters long",LOCATION_DISABLED_MESSAGE:"Please enable location \n service and reload \n the application!",TIME_LEFT:120,TIMES_UP_MESSAGE:"Time's up. Sorry :(",SHOW_TOOLTIP_TIME_FOR_MOVE_NEXT_PLACE:5e3},questions:{QUESTIONS_SELECT_PLACE:"Select a place to edit a question of it",QUESTIONS_SELECT_QUESTION_FOR_EDIT:"Select the question you want to edit",DELETE_QUESTION:"Delete this question?"},places:{SELECT_PLACE:"Select a place for edit or delete"},hiScores:{DATE_FORMAT:"DD/MM/YYYY hh:mm"},messages:{MISSING_TOKEN:"Token is missing :(",DELETED_ITEM:"Item deleted.",CREATED_ITEM:"Item created.",UPDATED_ITEM:"Item updated."}},call=function(){return{actions:{get:"GET",post:"POST",delete:"DELETE",put:"PUT"},ajax:function({to:e,action:t="GET",body:n=null,token:o=""}){return $.ajax({url:e,async:!0,headers:{Authorization:o},method:t,dataType:"json",data:n})}}}(),dealer={shuffle:function(e){if(e){for(var t,n,o=e.length;0!==o;)n=Math.floor(Math.random()*o),t=e[o-=1],e[o]=e[n],e[n]=t;return e}}},entities={fillAll:(e,t)=>Promise.all([e.getAll(e.entities.places,t,t.names.places).then(e=>t.set(t.names.places,e)),e.getAll(e.entities.questions,t,t.names.questions).then(e=>t.set(t.names.questions,e)),e.getAll(e.entities.hiScores,t,t.names.scores).then(e=>t.set(t.names.scores,e))])},geo=function(){return{get:function(e,t){return new Promise((e,t)=>navigator.geolocation.getCurrentPosition(e,t))},watchPosition:function(e,t){navigator.geolocation.watchPosition(e,t)}}}(),guidGenerator={generate:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})}},_=function(){var e={disabled:"disabled"};function t(e){if(!e)throw new Error("Invalid element");if(0===e.length)throw new Error("Element not found")}return{valueOf:function(e){return t(e),e.val()},setValueOf:function(e,n){t(e),e.val(n)},success:function(e){e=e||"Created",$.notify(e,"success")},error:function(e){if(0!=e.status){if(e.status<300)return $.notify(e.statusText,"success"),!0;e=e.statusText?e.statusText:e||"Error :( ",$.notify(e,"error")}else $.notify("No internet :(","error")},warning:function(e){$.notify(e,"warning")},findInArray:function(e,t){for(let n in e)for(let o in e[n])if(e[n][o]===t)return e[n];return null},disableElements:function(t){for(let n in t)t[n].prop(e.disabled,!0)},enableElements:function(t){for(let n in t)t[n].prop(e.disabled,!1)},showSpinner:function(){return new Promise(e=>{e($("body").addClass("loading"))})},hideSpinner:function(){return new Promise(e=>{e($("body").removeClass("loading"))})},confirm:function(e,t){$.confirm({title:"Confirm!",content:e,buttons:{confirm:()=>t(),cancel:()=>{}}})},setSelectedIndexOfSelectElement:function(e,t){e.attr("selectedIndex",t)},setTextOf:function(e,t){e.text(t)},hideElement:function(e){e.css("display","none")},showElement:function(e){e.css("display","block")},setOpacityOfElement:function(e,t){e.css("opacity",t)}}}(),repo={getAll:(e,t,n)=>navigator.onLine?call.ajax({to:e,action:call.actions.get}):$.Deferred().resolve(t.get(n)),put:(e,t,n)=>call.ajax({to:e,action:call.actions.put,token:n,body:t}),post:(e,t,n)=>call.ajax({to:e,action:call.actions.post,token:n,body:t}),delete:(e,t,n)=>call.ajax({to:e+"/"+t,action:call.actions.delete,token:n}),entities:{places:"api/places",questions:"api/questions",hiScores:"api/scores"},createPlace:({key:e,name:t,latitude:n,longitude:o,observations:a})=>{if(!(e&&t&&n&&o&&a))throw new Error("Invalid object creation");return{key:e,name:t,latitude:n,longitude:o,observations:a}},createQuestion:({key:e,belongsTo:t,statement:n,answer1:o,answer2:a,answer3:r,correctAnswer:i})=>{if(!(e&&t&&n&&o&&a&&r&&i))throw new Error("Invalid object creation");return{key:e,for:t,statement:n,answer1:o,answer2:a,answer3:r,correctAnswer:i}},createHiScore:({key:e,teamName:t,score:n,date:o})=>{if(!(e&&t&&n&&o))throw new Error("Invalid object creation");return{key:e,teamName:t,score:n,date:o}}},content=(e=>{let t=t=>{e("#body").html(t)};return{set:n=>(t=>e.get("Site/"+t+".html"))(n).then(t).then(()=>(t=>e.get("Site/"+t+(globalDebug?".js":"-min.js")))(n)),getMapScript:()=>e.getScript(constants.mapScriptAndKey)}})(jQuery),root=null,useHash=!0,hash="#",router=new Navigo(root,useHash,hash);router.on({questions:function(){_.showSpinner().then(()=>content.set("Questions/question")).then(_.hideSpinner)},places:function(){_.showSpinner().then(()=>content.set("Places/place")).then(_.hideSpinner)},hiScores:function(){_.showSpinner().then(()=>content.set("HiScores/hiScore")).then(_.hideSpinner)},"*":function(){_.showSpinner().then(()=>content.set("Game/game")).then(content.getMapScript).then(_.hideSpinner)}}).resolve();var storage={set:(e,t)=>{localStorage.removeItem(e);let n=JSON.stringify(t);localStorage.setItem(e,n)},get:e=>{let t=localStorage.getItem(e);return JSON.parse(t)},names:{scores:"scores",places:"places",questions:"questions",howToPlay:"howToPlay"}};