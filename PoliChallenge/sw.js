﻿var cacheName = 'pl-cache';

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
    '/sw.js',
    // bower_components,
    '/bower_components/bootstrap/dist/css/bootstrap.min.css',
    '/bower_components/font-awesome/css/font-awesome.min.css',
    '/bower_components/jQuery/dist/jquery.min.js',
    '/bower_components/bootstrap/dist/js/bootstrap.min.js',
    '/bower_components/jquery-confirm2/dist/jquery-confirm.min.js',
    '/bower_components/Geolib/dist/geolib.min.js',
    '/bower_components/moment/min/moment.min.js',
    '/bower_components/navigo/lib/navigo.min.js',
    '/NonBower_Components/notify.min.js'
];

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
    if ((e.request.method === "PUT" || e.request.method === "POST") && (false === navigator.onLine)) {
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