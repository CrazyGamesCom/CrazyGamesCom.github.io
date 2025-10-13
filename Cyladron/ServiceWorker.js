const cacheName = "com.crazygames-Cyladron-0.1.44";
const contentToCache = [
    "Build/06861f7c1d62398076672c5062a396df.loader.js",
    "Build/2e39eb098f1b7b4feb4c48dad981a739.framework.js.unityweb",
    "Build/a002b23a80696dfbbe425dc0dbf6443a.data.unityweb",
    "Build/76b54c38edc8d11899321a64701c0cdf.wasm.unityweb",
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
