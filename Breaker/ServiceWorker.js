const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/e74679ff2e31896c72750713e9ea2135.loader.js",
    "Build/5b16faef3b7ecefd897396fe4cb6e238.framework.js.unityweb",
    "Build/271630c1e3c9f3bdb74b7949a3455984.data.unityweb",
    "Build/c40eb0c4cdd256e9a338362ad52a626f.wasm.unityweb",
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
