const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/8d1c2c39f8a36f42769193dac01a71c0.loader.js",
    "Build/58b49a5032f749bce7459082b48b42f7.framework.js.unityweb",
    "Build/6470cf2f3aa76b9c3366198ba1b162d5.data.unityweb",
    "Build/d42629ad1205356a347e7f693e86b1e8.wasm.unityweb",
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
