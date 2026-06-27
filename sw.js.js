const CACHE_NAME = 'kurukh-converter-v1';
const urlsToCache = [
  '/Hindi-Devnagri---Kurukh-converter/',
  '/Hindi-Devnagri---Kurukh-converter/index.html',
  '/Hindi-Devnagri---Kurukh-converter/kurukh.ttf',
  '/Hindi-Devnagri---Kurukh-converter/icon-192.png',
  '/Hindi-Devnagri---Kurukh-converter/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) return caches.delete(name);
        })
      )
    )
  );
);