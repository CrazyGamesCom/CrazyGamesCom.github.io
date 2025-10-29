const cacheName = "com.crazygames-Cyladron-0.1.32";
const contentToCache = [
    "Build/1d13cc43ed525cc8ced9aca1199fb041.loader.js",
    "Build/510a11f5b2dd040ad19ef172361b2e72.framework.js.unityweb",
    "Build/6024ce4c0489cde96fbdb8cc3fab3c81.data.unityweb",
    "Build/7b460c0aa8ab21d4bad33f451fdc43f7.wasm.unityweb",
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
