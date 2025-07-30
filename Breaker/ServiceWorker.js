const cacheName = "pigbrain.io-Breaker-0.1.12";
const contentToCache = [
    "Build/ce9868ed7569d6b9cb43a0edb2003cc2.loader.js",
    "Build/d5975e997ef634be3659768001920b2c.framework.js.unityweb",
    "Build/a95b3806c8422702f3c9bb8375e91652.data.unityweb",
    "Build/540b44c3837c45dac82ac2c2fbf4d341.wasm.unityweb",
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
