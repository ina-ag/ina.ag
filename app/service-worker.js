self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('myCache-v1').then(function(cache) {
      return cache.addAll([
        'https://devinatemplate.blogspot.com',
        'https://dev.ina.ag/assets/global.css',
        'https://dev.ina.ag/assets/global.js',
        'https://devinatemplate.blogspot.com/favicon.ico',
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;

      }
      return fetch(event.request);

    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['myCache-v1'];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);

          }
        })
      );
    })
  );
});