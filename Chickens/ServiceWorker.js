const cacheName = "pigbrain.io-Chickens-0.1.16";
const contentToCache = [
    "Build/de64ad5044833a1ea52386ffd0ca611e.loader.js",
    "Build/b36b4c827d3868f323b0b5622fc6549e.framework.js.unityweb",
    "Build/4ed479376b362e9baec5bf5e92bddaf1.data.unityweb",
    "Build/ec5773894af0542ce11e8b7b87d3ef75.wasm.unityweb",
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
