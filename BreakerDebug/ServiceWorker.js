const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/8e003358b0a61c1d126ce2f65eec9eb1.loader.js",
    "Build/733ae6b3651d9beb46e2bd07549a41ad.framework.js.unityweb",
    "Build/976205110353202960ef1cd650aa229d.data.unityweb",
    "Build/83a076c43798e24ed1bf89eeaf5296f2.wasm.unityweb",
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
