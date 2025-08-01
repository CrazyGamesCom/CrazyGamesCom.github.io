const cacheName = "pigbrain.io-Breaker-0.1.15";
const contentToCache = [
    "Build/44ba2f83017266c1afb0d3627fc56929.loader.js",
    "Build/fd377ccfe360b59ec0a24496bc4b5c76.framework.js.unityweb",
    "Build/50b03bc349b1fd04b8c083ed8f764564.data.unityweb",
    "Build/0c7bf59139b3a68bc271ae7a483365d4.wasm.unityweb",
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
