const cacheName = "pigbrain.io-Breaker-0.1.18";
const contentToCache = [
    "Build/2af401d654265f3141a1ad8a5e75078c.loader.js",
    "Build/ea11cb46170f6f9dccc852235eb59fac.framework.js.unityweb",
    "Build/66416548826107e95982b783d87b6178.data.unityweb",
    "Build/5ce1e9f6eb72803afc2574f5703e1684.wasm.unityweb",
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
