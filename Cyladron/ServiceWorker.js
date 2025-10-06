const cacheName = "com.crazygames-Cyladron-0.1.28";
const contentToCache = [
    "Build/0281ddf98d343d3cf43973e682dab1b2.loader.js",
    "Build/6772b3b04a94fa0dad2fc1536bd5e579.framework.js.unityweb",
    "Build/45ba13671182f4daafd3ed4a450d8a18.data.unityweb",
    "Build/6f43f7117ef8ef4bebe208e7375c3f72.wasm.unityweb",
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
