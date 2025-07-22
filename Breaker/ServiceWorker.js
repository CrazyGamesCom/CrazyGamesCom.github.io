const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/f9cbc414f0a6d437de6345376222a344.loader.js",
    "Build/f2de789377e3512f47c28b6c349e6f44.framework.js.unityweb",
    "Build/4e0caf4ba583e74e0bd8bcae050d00f6.data.unityweb",
    "Build/e295b01a2f13dd53f7bde3a13bb22b14.wasm.unityweb",
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
