const cacheName = "pigbrain.io-Breaker-0.1.5";
const contentToCache = [
    "Build/7c6c369dcd19af33a74421c54e87fca7.loader.js",
    "Build/733ae6b3651d9beb46e2bd07549a41ad.framework.js.unityweb",
    "Build/7755057646f3091348119a55d6c30b03.data.unityweb",
    "Build/91c5caed9067a475e61f9f425eb01f1a.wasm.unityweb",
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
