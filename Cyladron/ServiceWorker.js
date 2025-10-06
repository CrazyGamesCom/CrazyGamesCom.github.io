const cacheName = "com.crazygames-Cyladron-0.1.28";
const contentToCache = [
    "Build/9c87547c9a24b5ea3d6cf9536e4f6a34.loader.js",
    "Build/6772b3b04a94fa0dad2fc1536bd5e579.framework.js.unityweb",
    "Build/e6ac1c1e691ab2dc06e978ab4544e149.data.unityweb",
    "Build/6bb9b5454f9718d5742dc1885b8678f2.wasm.unityweb",
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
