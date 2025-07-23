const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/62cfb44e6ac3d6d74922901f0b1f32ae.loader.js",
    "Build/f2de789377e3512f47c28b6c349e6f44.framework.js.unityweb",
    "Build/df460de17e8151789381c6e34be8fdf8.data.unityweb",
    "Build/5778639cd00d12e433578295e30385bf.wasm.unityweb",
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
