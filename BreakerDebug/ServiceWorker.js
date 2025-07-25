const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/0111f048e777a4d963e8bb7e5633c39e.loader.js",
    "Build/992b024e6f0bfb5431e9900f2e00c21b.framework.js.unityweb",
    "Build/33f6708786a015f55632a641e4e3eef3.data.unityweb",
    "Build/1a6ac533b4ae8b405c9e72c3e0cff2fc.wasm.unityweb",
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
