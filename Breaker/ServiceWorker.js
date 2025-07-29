const cacheName = "pigbrain.io-Breaker-0.1.9";
const contentToCache = [
    "Build/ddef6c38fa73ff2ce1cc22a532eaa303.loader.js",
    "Build/87bcc2f6ba5b59bddaf8d19467a5bc19.framework.js.unityweb",
    "Build/1487d11137d6f043c1fa611007af6138.data.unityweb",
    "Build/002747367f4710761579793d0f6587eb.wasm.unityweb",
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
