const cacheName = "pigbrain.io-Chickens-0.1.5";
const contentToCache = [
    "Build/8c0a38695ab2f33d1ec257a48bb1c55f.loader.js",
    "Build/e4312cb378ad5555f2bf1c6e7ad13b34.framework.js.unityweb",
    "Build/3d4c48a44a6fa1df8444d864074e3e62.data.unityweb",
    "Build/924f0c9f2742ccd30928cddf17504e3f.wasm.unityweb",
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
