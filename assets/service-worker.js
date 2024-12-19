const CACHE_NAME = 'blogger-pwa-cache-v1';


const urlsToCache = [
    'https://dev.ina.ag/index/offline.html',

    'https://dev.ina.ag/assets/manifest.json'

];


self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
