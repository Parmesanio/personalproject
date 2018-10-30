// Name our cache
var CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// Cache static assets to serve offline
const staticAssets = [
    './index.html',
    './main.js',
    './fallback.json'
]

self.addEventListener('install', async () => {
    //Take Cached assets and store them for later use
    const cache = await caches.open('tmp-static');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    //Events sent from application to the network

    const req = event.request;
    const url = new URL(req.url);
    //Fetching from own site?
    if (url.origin == location.origin) {
        //Define response to given fetch events
    event.respondWith(cacheFirst(req)); 
    } 
    else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}
async function networkFirst(req) {
    const cache = await caches.open('tmp-dynamic');
    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedResponse =  await cache.match(req);
        return cachedResponse || await caches.match('./fallback.json')
    }
}

let deferredPrompt;
//Home Screen Prompt
self.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();

    deferredPrompt = event;
    console.log('Deferred Prompt', deferredPrompt);
    btnAdd.style.display = 'block'
});