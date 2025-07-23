const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/f803ac7ad3d536a6046281d363e7f88f.loader.js",
    "Build/992b024e6f0bfb5431e9900f2e00c21b.framework.js.unityweb",
    "Build/6d6e6ec25e681ee2a91e121f54ec2aca.data.unityweb",
    "Build/64b6ec2049edccf1e3d519893456a4c3.wasm.unityweb",
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
