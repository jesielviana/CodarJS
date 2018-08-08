const cacheName = 'codar-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/codar.html',
  '/js/app.js',
  '/js/dragDrop.js',
  '/js/dragDropTouch.js',
  '/css/style.css',
  'codemirror/lib/codemirror.js',
  'codemirror/mode/javascript/javascript.js',
  'codemirror/lib/codemirror.css',
  'codemirror/theme/material.css'
];

self.addEventListener('install', function (e) {
  // console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      // console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  // console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          // console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      // console.log('[ServiceWorker] Fetch Only', e.request.url);
      return response || fetch(e.request);
    })
  );
});