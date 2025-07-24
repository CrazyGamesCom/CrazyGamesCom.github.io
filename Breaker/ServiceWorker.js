const cacheName = "pigbrain.io-Breaker-0.1.0";
const contentToCache = [
    "Build/ff94a4df09954f85cefba317aeeae326.loader.js",
    "Build/58b49a5032f749bce7459082b48b42f7.framework.js.unityweb",
    "Build/84d39f21af4a7d153468a6a47554b94a.data.unityweb",
    "Build/26333e5a8bae857f5adcccb562eb7df9.wasm.unityweb",
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
