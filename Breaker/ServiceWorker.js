const cacheName = "pigbrain.io-Breaker-0.1.6";
const contentToCache = [
    "Build/7c6cf22c019af3d8441e001ef436dbc1.loader.js",
    "Build/23470ab1428f498a2635de2b85fde077.framework.js.unityweb",
    "Build/44cb51f6eb8808edb3c73fb5ba909339.data.unityweb",
    "Build/322cc3c2bcf2e2cea28328157d390d77.wasm.unityweb",
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
