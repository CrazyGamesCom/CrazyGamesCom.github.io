const cacheName = "pigbrain.io-Chickens-0.1.8";
const contentToCache = [
    "Build/9d885b79f39111f93c9db4636ca6700d.loader.js",
    "Build/4d7d44e3dea46d95539bbb27d884ee30.framework.js.unityweb",
    "Build/a5b281c310a2b3a270a0b465ec451707.data.unityweb",
    "Build/05137a8ed55828421d68511e783256eb.wasm.unityweb",
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
