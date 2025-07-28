const cacheName = "pigbrain.io-Chickens-0.1.0";
const contentToCache = [
    "Build/5c36d765c897fa4b201ed534214aabfb.loader.js",
    "Build/3b64801a9a850d7f10660fc3624e5db3.framework.js.unityweb",
    "Build/2477929ac4349a8146800e5590dcbefe.data.unityweb",
    "Build/890839ba5059e077c2c86f4c9174fcca.wasm.unityweb",
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
