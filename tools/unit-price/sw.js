// Unit Price — service worker (build spec section 7.1).
// When any cached file changes in a later release, change the cache name (v2, v3 and so on).
const CACHE_PREFIX = 'unit-price-';
const CACHE_NAME = CACHE_PREFIX + 'v1';

const FILES = [
  './',
  './index.html',
  './style.css',
  './calc.js',
  './script.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  // Shared toolbox stylesheet, outside this folder but needed for the page to look right offline.
  '../../assets/css/base.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  // Every tool in the toolbox shares one origin, so only delete this tool's old caches.
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names
          .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const page = await cache.match('./index.html');
      if (page) return page;
    }
    return fetch(request);
  })());
});
