import { build, files, timestamp } from "$service-worker";

const BUILD_CACHE_NAME = `build-${timestamp}`;
const FILES_CACHE_NAME = `files-${timestamp}`;

const ACTIVE_CACHES = new Set([BUILD_CACHE_NAME, FILES_CACHE_NAME]);

self.addEventListener("install", function (event: ExtendableEvent) {
  // Cache JS, CSS files
  event.waitUntil(
    caches.open(BUILD_CACHE_NAME).then(function (cache) {
      cache.addAll(build);
    })
  );

  // Cache static assets
  event.waitUntil(
    caches.open(FILES_CACHE_NAME).then(function (cache) {
      cache.addAll(files);
    })
  );
});

self.addEventListener("activate", function (event: ExtendableEvent) {
  // Remove "old" caches for past builds
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (!ACTIVE_CACHES.has(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event: FetchEvent) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
  );
});
