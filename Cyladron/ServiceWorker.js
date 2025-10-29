const cacheName = "com.crazygames-Cyladron-0.1.40";
const contentToCache = [
    "Build/2d145ba744846c92899d2a9ffc936a14.loader.js",
    "Build/510a11f5b2dd040ad19ef172361b2e72.framework.js.unityweb",
    "Build/0d29a9e5b5a10b0e80ecbdd8b76d9387.data.unityweb",
    "Build/81d3cfb55ac2debdc009b6e25d0fa342.wasm.unityweb",
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
