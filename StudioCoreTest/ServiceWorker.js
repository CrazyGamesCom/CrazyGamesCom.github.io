const cacheName = "DefaultCompany-empty-0.1.11";
const contentToCache = [
    "Build/f1551dfe7e2c42a24bb896c2ead10ef7.loader.js",
    "Build/19b6b7c4adca116a63fb056538f8838b.framework.js.unityweb",
    "Build/2ce2385f0cdb8a1bd2ce0982aaf5abf0.data.unityweb",
    "Build/59a82ace70de002a7d2dc0d337b06458.wasm.unityweb",
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
