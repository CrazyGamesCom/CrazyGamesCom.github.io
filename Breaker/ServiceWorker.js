const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/5d48e50bd20f74c42ef8e68950d45125.loader.js",
    "Build/5b16faef3b7ecefd897396fe4cb6e238.framework.js.unityweb",
    "Build/a044c36b4bd3607261f2cfb61f98f176.data.unityweb",
    "Build/9c4377c21ee8748d8115197ff2317a76.wasm.unityweb",
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
