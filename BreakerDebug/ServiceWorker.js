const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/38380d5c99a13071537c2c84c0c27654.loader.js",
    "Build/992b024e6f0bfb5431e9900f2e00c21b.framework.js.unityweb",
    "Build/3aac8ebb190ad5b030ebc5061100f462.data.unityweb",
    "Build/c4732b4b5dca156216aa87e41e86a0f8.wasm.unityweb",
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
