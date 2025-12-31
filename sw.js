const CACHE_NAME = 'gitalks-pwa-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Kurulum
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Yeni sürümü hemen zorla
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Dosyalar önbelleğe alınıyor...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Aktifleştirme ve Eski Cache Temizliği
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Eski önbellek silindi:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch (İnternet Yoksa Cache'den Ver)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
