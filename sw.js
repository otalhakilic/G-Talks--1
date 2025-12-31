const CACHE_NAME = 'gitalks-app-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './logo.png'
];

// Yükleme (Install)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Dosyalar önbelleğe alındı');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting(); // Yeni versiyonu hemen aktif et
});

// Aktifleştirme (Activate) - Eski cache'leri temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Getirme (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
