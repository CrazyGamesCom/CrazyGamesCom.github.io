const cacheName = "pigbrain.io-Breaker-0.1.9";
const contentToCache = [
    "Build/799c4bf7271c292b59ce8cec466d3c81.loader.js",
    "Build/87bcc2f6ba5b59bddaf8d19467a5bc19.framework.js.unityweb",
    "Build/db2084fca9f3e3c175d87c61567cbf9f.data.unityweb",
    "Build/9802af50eccfc4619118db08e165f254.wasm.unityweb",
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
