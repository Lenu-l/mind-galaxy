// Service Worker for Mind Galaxy — Cache-First + Background Update
const CACHE = 'mg-v1';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(['/', '/index.html', '/manifest.json', '/icon-180.png'])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only cache GET navigation and same-origin requests
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      // Always try network in background to update cache
      const fetchPromise = fetch(e.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => null);

      // Return cached immediately, or wait for network if no cache
      return cached || fetchPromise;
    })
  );
});

// Listen for refresh message — clear cache and reload
self.addEventListener('message', e => {
  if (e.data === 'force-refresh') {
    caches.delete(CACHE).then(() => {
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.navigate(client.url))
      );
    });
  }
});
