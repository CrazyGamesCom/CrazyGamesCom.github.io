const cacheName = "pigbrain.io-Breaker-0.1.22";
const contentToCache = [
    "Build/7184963291c453f5884bc6f375555efa.loader.js",
    "Build/14e3b82a31526d6c3bdad0c1e10c6e06.framework.js.unityweb",
    "Build/551b302aa4925b3a4c5ac28e93a9de37.data.unityweb",
    "Build/624a10bd22aa9ba4ac701060ef31d2bf.wasm.unityweb",
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
