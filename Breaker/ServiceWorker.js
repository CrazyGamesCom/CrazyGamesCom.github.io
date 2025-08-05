const cacheName = "pigbrain.io-Breaker-0.1.23";
const contentToCache = [
    "Build/fa73c5c81a334087a0d88eb21325d836.loader.js",
    "Build/14e3b82a31526d6c3bdad0c1e10c6e06.framework.js.unityweb",
    "Build/a329a8e08f5f6c83755fe2510b62b9e7.data.unityweb",
    "Build/7e23920e9c05b7e381a5e78d9404455e.wasm.unityweb",
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
