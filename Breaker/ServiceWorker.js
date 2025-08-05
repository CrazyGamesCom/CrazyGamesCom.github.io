const cacheName = "pigbrain.io-Breaker-0.1.19";
const contentToCache = [
    "Build/dbbf5db672d045aafeb9c275e2b36e49.loader.js",
    "Build/ea11cb46170f6f9dccc852235eb59fac.framework.js.unityweb",
    "Build/1e1ae4b044c8e6a668f04a3206e46be2.data.unityweb",
    "Build/24beda7c426aa0d9b1207dcd503a17fb.wasm.unityweb",
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
