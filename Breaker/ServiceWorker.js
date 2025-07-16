const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/64df4ef7be5e97499b42c2101dfb3de2.loader.js",
    "Build/5b16faef3b7ecefd897396fe4cb6e238.framework.js.unityweb",
    "Build/bfa1462d4c20c36664d6d2c2c9362dbf.data.unityweb",
    "Build/57de6a28cede76bc0e27ddee248aa363.wasm.unityweb",
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
