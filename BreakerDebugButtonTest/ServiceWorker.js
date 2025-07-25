const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/4ea30a6fe1606f24af199e38353a5ea1.loader.js",
    "Build/03fde88808007bb08b1ce2d6f9dbe670.framework.js.unityweb",
    "Build/f8742939fedee0ef91a497bdacde08c9.data.unityweb",
    "Build/917cf3ab61b43b9dc7f3e56ccbeea25b.wasm.unityweb",
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
