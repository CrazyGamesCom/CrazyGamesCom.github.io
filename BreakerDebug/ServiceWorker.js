const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/a3dfd52443c520a24e5484d823f53fe0.loader.js",
    "Build/992b024e6f0bfb5431e9900f2e00c21b.framework.js.unityweb",
    "Build/ef95be28463cde7be493b27749b38340.data.unityweb",
    "Build/dc96bb7fd5868ec4d338599261356dad.wasm.unityweb",
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
