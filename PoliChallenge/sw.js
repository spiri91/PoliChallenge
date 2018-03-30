var cacheName = 'pl-cache'

var filesToCache = [
                '/',
                '/Index.html',
                '/Site/Game/game.html',
                '/Site/Game/game.js',
                '/Site/Game/game.css',
                '/Site/HiScores/hiScore.css',
                '/Site/HiScores/hiScore.html',
                '/Site/HiScores/hiScore.js',
                '/Site/Places/place.css',
                '/Site/Places/place.html',
                '/Site/Places/place.js',
                '/Site/Questions/question.css',
                '/Site/Questions/question.js',
                '/Site/Questions/question.html',
                '/Site/MainController.js',
                '/Site/MainSheet.css',
                '/Output/MyScripts/app.js',
                '/Output/myStyles.css',
            ]

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});

//self.addEventListener('fetch', function (event) {

//});

//self.addEventListener('install', function (e) {
//    e.waitUntil(caches.open(cacheName).then(function (cache) { }));
//});

//self.addEventListener('install', function (e) {
//    e.waitUntil(
//        caches.open(cacheName).then(function (cache) {
//            return cache.addAll([
//                '/',
//                '/Index.html',
//                '/game.html',
//                '/game.js',
//                '/game.css',
//                '/hiScore.css',
//                '/hiScore.html',
//                '/hiScore.js',
//                '/place.css',
//                '/place.html',
//                '/place.js',
//                '/question.css',
//                '/question.js',
//                '/question.html',
//                '/MainController',
//                '/MainSheet.css',
//                '/app.js',
//                '/myStyles.css',
//            ]);
//        })
//    );
//});

//self.addEventListener('fetch', function (event) {
//    event.respondWith(
//        caches.match(event.request).then(function (response) {
//            return response || fetch(event.request);
//        })
//    );
//});