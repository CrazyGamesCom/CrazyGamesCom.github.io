const cacheName = "pigbrain.io-Breaker-0.1.13";
const contentToCache = [
    "Build/e4042f58770c981c8ef62275fde4eab7.loader.js",
    "Build/a929e49c325ac3316b5961958b1cc0ff.framework.js.unityweb",
    "Build/11906e1f2aba4078da11fa4f03594d42.data.unityweb",
    "Build/9ee6a3e279487a54799f1aaf871471fe.wasm.unityweb",
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
