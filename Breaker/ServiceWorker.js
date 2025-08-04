const cacheName = "pigbrain.io-Breaker-0.1.16";
const contentToCache = [
    "Build/331007108c583f5f87a485c261e5618b.loader.js",
    "Build/ea11cb46170f6f9dccc852235eb59fac.framework.js.unityweb",
    "Build/17bd6df3643ca6013df25142d0ca3119.data.unityweb",
    "Build/4587b8c4e08e31256cec52d6519dd83d.wasm.unityweb",
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
