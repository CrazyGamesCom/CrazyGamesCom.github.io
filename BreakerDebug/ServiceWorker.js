const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/721e1e22a1c57bad8e00fc6df9decd60.loader.js",
    "Build/992b024e6f0bfb5431e9900f2e00c21b.framework.js.unityweb",
    "Build/8fbe42f54f76ab91d87842e47620ddb3.data.unityweb",
    "Build/4dc9326a7a254b96614f673932fae5ed.wasm.unityweb",
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
