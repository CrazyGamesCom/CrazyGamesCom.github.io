const cacheName = "com.crazygames-Cyladron-0.1.59";
const contentToCache = [
    "Build/726543d3029c11d93f8779db444df0b7.loader.js",
    "Build/6a09b07c85c3a91e26cb2e46e62ae973.framework.js.unityweb",
    "Build/b87702d6cda9583df64bda209662312a.data.unityweb",
    "Build/d3f26c15264f9984885e520ddc444051.wasm.unityweb",
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
