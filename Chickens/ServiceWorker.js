const cacheName = "pigbrain.io-Chickens-0.1.9";
const contentToCache = [
    "Build/e9c5ad7e2ef08cdee985d628604118da.loader.js",
    "Build/2daeb8cd84b594a61d20da590ba38f6a.framework.js.unityweb",
    "Build/9e7c192cc50884f7c2514df10a1d9687.data.unityweb",
    "Build/f1f66406cf659846efee7f8ec66eb390.wasm.unityweb",
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
