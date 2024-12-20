self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ina-cache').then((cache) => {
      return cache.addAll([
        'https://www.ina.ag', 
        'https:dev.ina.ag/css/ina.ag.style.css'

      ]);
    })
  );
});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
      
        return cachedResponse;
      }
      
      return fetch(event.request);
    })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['ina-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
