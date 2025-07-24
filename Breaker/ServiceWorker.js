const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/9a228747260722003f1a60be442b8d21.loader.js",
    "Build/58b49a5032f749bce7459082b48b42f7.framework.js.unityweb",
    "Build/407f9685ffa511da12e49e757d815118.data.unityweb",
    "Build/dadaf20bf7f5bb0864c05d68d9cbba57.wasm.unityweb",
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
