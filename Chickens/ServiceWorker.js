const cacheName = "pigbrain.io-Chickens-0.1.18";
const contentToCache = [
    "Build/c8dee0472b5a5483db96205cc977052e.loader.js",
    "Build/b36b4c827d3868f323b0b5622fc6549e.framework.js.unityweb",
    "Build/7783e283cba81b4c5b6c4b32bf5ddce2.data.unityweb",
    "Build/e87748aed964bc0533e110905a924cea.wasm.unityweb",
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
