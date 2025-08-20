const cacheName = "DefaultCompany-empty-0.1.10";
const contentToCache = [
    "Build/8bc9b56542361a2e7a198c11ab8b27b1.loader.js",
    "Build/19b6b7c4adca116a63fb056538f8838b.framework.js.unityweb",
    "Build/8fd164bdc44cd9039c68d1b1187b77bc.data.unityweb",
    "Build/e0a5447347f63c1ab76517f0180a305a.wasm.unityweb",
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
