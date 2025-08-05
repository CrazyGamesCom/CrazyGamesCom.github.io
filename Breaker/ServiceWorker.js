const cacheName = "pigbrain.io-Breaker-0.1.17";
const contentToCache = [
    "Build/d6dcbf04391e0c28535039945afe4e68.loader.js",
    "Build/ea11cb46170f6f9dccc852235eb59fac.framework.js.unityweb",
    "Build/c62355d1e801101fc99241a50b6944ef.data.unityweb",
    "Build/10c1f967525d189224af7874cf5c4555.wasm.unityweb",
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
