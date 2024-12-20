const CACHE_NAME = 'v1';
const urlsToCache = [
    'https://www.ina.ag',
    'https://www.ina.ag/p/index.html',
    'https://dev.ina.ag/css/ina.ag.style.css',
    'https://www.ina.ag/p/services.html',

];


self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});


self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
              
                return response || fetch(event.request);
            })
    );
});
