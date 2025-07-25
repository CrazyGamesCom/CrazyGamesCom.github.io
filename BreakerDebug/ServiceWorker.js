const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/d8b6e8f133173461cede067a9841650f.loader.js",
    "Build/58e14f7bd143e67951ee67336a4647c7.framework.js.unityweb",
    "Build/f6807dfe1cea68a4ad01c45c468a2c9f.data.unityweb",
    "Build/b203db24413273e385e4da4dfdc0fe0e.wasm.unityweb",
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
