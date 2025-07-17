const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/c781636d67e0a36ca09621308c9689ce.loader.js",
    "Build/5b16faef3b7ecefd897396fe4cb6e238.framework.js.unityweb",
    "Build/cf87b680427c148dd8ea924cfe53f19f.data.unityweb",
    "Build/4620b9e0c3ceb3c22b18308a7e5082f2.wasm.unityweb",
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
