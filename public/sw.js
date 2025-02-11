const CACHE_NAME = 'scribble-scrabble-cache-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Check for version updates
self.addEventListener('message', (event) => {
  if (event.data.type === 'CHECK_VERSION') {
    fetch('/api/version')
      .then(response => response.json())
      .then(data => {
        if (data.version !== event.data.currentVersion) {
          // Clear cache and notify client to reload
          caches.delete(CACHE_NAME).then(() => {
            self.clients.matchAll().then(clients => {
              clients.forEach(client => client.postMessage({
                type: 'NEW_VERSION_AVAILABLE'
              }));
            });
          });
        }
      });
  }
});