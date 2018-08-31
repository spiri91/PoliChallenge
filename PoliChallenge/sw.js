var cacheName = 'pl-cache';

var filesToCache = [
    '/',
    '/Index.html',
    '/Site/Game/game.html',
    '/Site/Game/game-min.js',
    '/Site/Game/game.min.css',
    '/Site/HiScores/hiScore.min.css',
    '/Site/HiScores/hiScore.html',
    '/Site/HiScores/hiScore-min.js',
    '/Site/Places/place.min.css',
    '/Site/Places/place.html',
    '/Site/Places/place-min.js',
    '/Site/Questions/question.min.css',
    '/Site/Questions/question-min.js',
    '/Site/Questions/question.html',
    '/Site/MainController-min.js',
    '/Site/MainSheet.css',
    '/Output/MyScripts/app-min.js',
    '/Output/myStyles.min.css',
    '/sw.js',
    // bower_components,
    '/bower_components/bootstrap/dist/css/bootstrap.min.css',
    '/bower_components/font-awesome/css/font-awesome.min.css',
    '/bower_components/font-awesome/fonts/fontawesome-webfont2.svg',
    '/bower_components/jQuery/dist/jquery.min.js',
    '/bower_components/bootstrap/dist/js/bootstrap.min.js',
    '/bower_components/jquery-confirm2/dist/jquery-confirm.min.css',
    '/bower_components/jquery-confirm2/dist/jquery-confirm.min.js',
    '/bower_components/Geolib/dist/geolib.min.js',
    '/bower_components/moment/min/moment.min.js',
    '/bower_components/navigo/lib/navigo.min.js',
    '/NonBower_Components/notify.min.js',
    '/NonBower_Components/cookiesMessage.js',
    '/NonBower_Components/popper.min.js',
    '/NonBower_Components/shareButtons.js',
    // other,
    '/Output/loader.gif',
    '/Output/Bucharest.PNG',
    '/Output/CustomFonts/bangers-v10-latin-regular.woff2',
    '/manifest.json'
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    if ((e.request.method === "PUT" || e.request.method === "POST") && false === navigator.onLine) {
        e.respondWith(alert("No internet :("));
        new Error('No internet connectivity!');
    }
    else
        e.respondWith(
            caches.match(e.request).then(function (response) {
                return response || fetch(e.request);
            })
        );
});