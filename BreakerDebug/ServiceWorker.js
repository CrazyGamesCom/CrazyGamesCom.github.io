const cacheName = "pigbrain.io-Breaker-0.1.11";
const contentToCache = [
    "Build/eeb0dbb7c65a11e96ac46dc7ac691981.loader.js",
    "Build/d5975e997ef634be3659768001920b2c.framework.js.unityweb",
    "Build/743ce2c4318f1ba02c7c1fd2f60be545.data.unityweb",
    "Build/a9dbdf008345049e7b0b3896add61f86.wasm.unityweb",
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
