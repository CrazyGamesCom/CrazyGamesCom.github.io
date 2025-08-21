const cacheName = "DefaultCompany-empty-0.1.12";
const contentToCache = [
    "Build/e9f9e0103e2229beba99fbf789eaf512.loader.js",
    "Build/0b8c8deadef9b168800f70e3b0e7a548.framework.js.unityweb",
    "Build/a1ad5af0a035c7e90983474258d492bd.data.unityweb",
    "Build/a4f5b948c7b52bf8d31b9a99fd5bbf6e.wasm.unityweb",
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
