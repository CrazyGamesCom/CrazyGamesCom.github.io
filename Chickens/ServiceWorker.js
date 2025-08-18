const cacheName = "pigbrain.io-Chickens-0.1.12";
const contentToCache = [
    "Build/cdf7904006e4d3794794b1a87ccd7e89.loader.js",
    "Build/b36b4c827d3868f323b0b5622fc6549e.framework.js.unityweb",
    "Build/406e088d1f6718d1762364585dc6996a.data.unityweb",
    "Build/7f8965f5b86f4ad26012630d617048aa.wasm.unityweb",
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
