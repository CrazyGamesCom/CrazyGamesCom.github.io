const cacheName = "DefaultCompany-empty-0.1.9";
const contentToCache = [
    "Build/c9aff0293c35b467f5c2e2c47989b2a9.loader.js",
    "Build/19b6b7c4adca116a63fb056538f8838b.framework.js.br",
    "Build/077540d7dbf501db39d80e692ee86bab.data.br",
    "Build/e0a5447347f63c1ab76517f0180a305a.wasm.br",
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
