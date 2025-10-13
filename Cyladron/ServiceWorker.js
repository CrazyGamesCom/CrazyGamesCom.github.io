const cacheName = "com.crazygames-Cyladron-0.1.36";
const contentToCache = [
    "Build/3a5252d1900b75d0d60b76ad939c14db.loader.js",
    "Build/2e39eb098f1b7b4feb4c48dad981a739.framework.js.unityweb",
    "Build/6d87811658a78337986a26e91fc9f37e.data.unityweb",
    "Build/60c34935d46417ac8b6e37a06e19d61e.wasm.unityweb",
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
