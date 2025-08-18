const cacheName = "pigbrain.io-Chickens-0.1.14";
const contentToCache = [
    "Build/6ce9dd065c30fdc830ca23b0bfac5fad.loader.js",
    "Build/b36b4c827d3868f323b0b5622fc6549e.framework.js.unityweb",
    "Build/dd9009554089d7fbb1d0a10bd1b0417e.data.unityweb",
    "Build/dce373f19b735265c51cf06bcab6fe10.wasm.unityweb",
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
