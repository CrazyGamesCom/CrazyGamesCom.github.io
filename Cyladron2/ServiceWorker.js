const cacheName = "com.crazygames-Cyladron-0.1.45";
const contentToCache = [
    "Build/37568e5f5e97a719b63e8f32b4615f3a.loader.js",
    "Build/499fbdec67f58b761c2eea15ab25788b.framework.js.unityweb",
    "Build/0c87ce733fa4eeb2e8a9e9a5f5e87ebb.data.unityweb",
    "Build/06be9bac6ed00fb60e0a898331501d9c.wasm.unityweb",
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
