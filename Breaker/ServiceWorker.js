const cacheName = "pigbrain.io-Breaker-0.1.14";
const contentToCache = [
    "Build/50c2247cca72c8c0338bcecaca3cb365.loader.js",
    "Build/a929e49c325ac3316b5961958b1cc0ff.framework.js.unityweb",
    "Build/303894eae7adf3cc64f59a648b7c72ee.data.unityweb",
    "Build/b91b8c6c2dd78e65591304a1b2c71be3.wasm.unityweb",
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
