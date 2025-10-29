const cacheName = "com.crazygames-Cyladron-0.1.33";
const contentToCache = [
    "Build/d0908631c775da7fc0941ad9e3cdbbd2.loader.js",
    "Build/a32c6f344b74ae4238ec54029457b64d.framework.js.unityweb",
    "Build/1c448cbcb311fe0867c13eda76f5efb4.data.unityweb",
    "Build/28c9a4bdb40c6ffdd301848e396ec3f8.wasm.unityweb",
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
