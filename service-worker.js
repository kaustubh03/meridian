'use strict';

var cacheVersion = 1;
var currentCache = {
    offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'index.html';

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(currentCache.offline).then(function (cache) {
            return cache.addAll([
              "./js/script.js",
              "./js/showdown.min.js",
              "style.css",
              "./fonts/Catamaran-Regular.ttf",
              "./images/github.png",
              "./images/linkedin.png",
              "./images/favicon.ico",
              "./images/quora.png",
              offlineUrl
            ]);
        })
    );
});

this.addEventListener('fetch', event => {
    // request.mode = navigate isn't supported in all browsers
    // so include a check for Accept: text/html header.
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request.url).catch(error => {
                // Return the offline page
                return caches.match(offlineUrl);
            })
        );
    }
    else {
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
            .then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});