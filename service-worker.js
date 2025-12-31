const CACHE_NAME = 'site-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js'
  // Buraya sitende kullandığın logo veya başka önemli resim yollarını da ekleyebilirsin.
];

// 1. Yükleme: Dosyaları hafızaya at
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Çalışma: İnternet yoksa hafızadan göster
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
