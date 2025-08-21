const cacheName = "DefaultCompany-empty-0.1.13";
const contentToCache = [
    "Build/7a0f447a75075da7d43cc4f7da6fc322.loader.js",
    "Build/2e51e45aa30a5f581eabee9c1ecaaafd.framework.js.unityweb",
    "Build/41423c8eac40fac01bb464c9ba129acf.data.unityweb",
    "Build/368af585dd360aba74b8bd48b113a26a.wasm.unityweb",
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
