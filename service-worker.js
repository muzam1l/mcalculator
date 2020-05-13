var CACHE = 'cache-and-update';
const filesToCache = [
  '/mcalculator/',
  '/mcalculator/index.html',
  '/mcalculator/assets/CalcMDL2.ttf',
  '/mcalculator/js/engine.js',
  '/mcalculator/js/engine.wasm',
  '/mcalculator/js/script.js',
  '/mcalculator/fonts.css',
  '/mcalculator/splash.css',
  '/mcalculator/standard.css',
];

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');

  evt.waitUntil(precache());
});
self.addEventListener('fetch', function (evt) {
  evt.respondWith(fromCache(evt.request));

  evt.waitUntil(update(evt.request));
});
self.addEventListener('activate', function (event) {
  console.log('The service worker is activating and removing old Caches')
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          if (cacheName !== CACHE) {
            return true;
          }
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    }).then(self.clients.claim())
  );
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match in cache for', request.url);
    });
  });
}
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(filesToCache);
  });
}
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      if (!response.ok) {
        return
      }
      return cache.put(request, response);
    }).catch(error => {
      //no problem if can't update
      return;
    })
  });
}