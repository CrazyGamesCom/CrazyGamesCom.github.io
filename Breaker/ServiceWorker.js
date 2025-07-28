const cacheName = "pigbrain.io-Breaker-0.1.1";
const contentToCache = [
    "Build/ec54ce5188073ef9d6ff778351081723.loader.js",
    "Build/58e14f7bd143e67951ee67336a4647c7.framework.js.unityweb",
    "Build/fa7e45ebe0f07ee41c5467d12719ab20.data.unityweb",
    "Build/64e6e9f1f9183b21e6408b8f397e6b28.wasm.unityweb",
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
