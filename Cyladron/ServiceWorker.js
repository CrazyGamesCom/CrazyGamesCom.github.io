const cacheName = "com.crazygames-Cyladron-0.1.30";
const contentToCache = [
    "Build/6fd37a1e3fdda79ba9236e85a5d36f33.loader.js",
    "Build/6772b3b04a94fa0dad2fc1536bd5e579.framework.js.unityweb",
    "Build/2fcce5544d3beab19dc09c4bbd800618.data.unityweb",
    "Build/86d0b384b61b27ec292c3ef9b45fba4f.wasm.unityweb",
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
