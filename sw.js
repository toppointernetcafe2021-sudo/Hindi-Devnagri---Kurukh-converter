const CACHE_NAME = 'kurukh-converter-v1';

const urlsToCache = [
  '/Hindi-Devnagri---Kurukh-converter/',
  '/Hindi-Devnagri---Kurukh-converter/index.html',
  '/Hindi-Devnagri---Kurukh-converter/manifest.json',
  '/Hindi-Devnagri---Kurukh-converter/kurukh.ttf',
  '/Hindi-Devnagri---Kurukh-converter/192.png',
  '/Hindi-Devnagri---Kurukh-converter/512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
