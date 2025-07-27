const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/c62e07b21bb60737532943c347531423.loader.js",
    "Build/733ae6b3651d9beb46e2bd07549a41ad.framework.js.unityweb",
    "Build/7161f26698a83e3bb3951b633ed25a56.data.unityweb",
    "Build/75e81993ab2ca9e3e227175476b51aa7.wasm.unityweb",
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
