const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/14a41e81d6930ec885dbe9700adcfb3d.loader.js",
    "Build/03fde88808007bb08b1ce2d6f9dbe670.framework.js.unityweb",
    "Build/fe85c7b72e775953b95412d05f9867bc.data.unityweb",
    "Build/8fc743bd155f50bdc3c307f16aa3c396.wasm.unityweb",
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
