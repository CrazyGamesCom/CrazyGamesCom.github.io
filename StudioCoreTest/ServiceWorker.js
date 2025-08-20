const cacheName = "pigbrain.io-Breaker-0.1.28";
const contentToCache = [
    "Build/47c75c3fc4d2204ab403bcd68ea606f6.loader.js",
    "Build/14e3b82a31526d6c3bdad0c1e10c6e06.framework.js.unityweb",
    "Build/b1a9d9922cb50957573f50282d8dd2b3.data.unityweb",
    "Build/93f8f1e7005e1857a0381ef47e34f9ad.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
