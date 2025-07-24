const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/634649512af51b0e3303c06ddca616ad.loader.js",
    "Build/9af4535a4ca74e4e1da41d25d51620e1.framework.js.unityweb",
    "Build/16aebada8111ff81dbe7fc45f69b39a3.data.unityweb",
    "Build/0c5e29389f38ff08f843c6a1e918513d.wasm.unityweb",
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
