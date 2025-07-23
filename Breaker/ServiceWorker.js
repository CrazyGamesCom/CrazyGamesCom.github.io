const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/fc12e8940117d42879f5725b1d9e2506.loader.js",
    "Build/9af4535a4ca74e4e1da41d25d51620e1.framework.js.unityweb",
    "Build/a8446ece0292f3320d50fc66c331e116.data.unityweb",
    "Build/8a4aa82d5d59cc8567691c69f5290f00.wasm.unityweb",
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
