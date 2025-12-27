const CACHE_NAME = 'lexnova-v1';
const STATIC_ASSETS = [
    '/',
    '/offline',
    '/icon-192.png',
    '/icon-512.png',
    '/icon-192-maskable.png',
    '/icon-512-maskable.png',
    '/file.svg',
    '/globe.svg',
    '/next.svg',
    '/vercel.svg',
    '/window.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

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

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. Backend / Admin / API - Network Only (Never Cache)
    if (
        url.pathname.startsWith('/admin') ||
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/auth')
    ) {
        return; // Default network behavior
    }

    // 2. Navigation Requests (Page Visits) - Network First, Fallback to Offline
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .catch(() => {
                    return caches.match('/offline');
                })
        );
        return;
    }

    // 3. Static Assets (Images, fonts, JS) - Cache First
    if (
        url.pathname.startsWith('/_next/static') ||
        url.pathname.startsWith('/icons') ||
        STATIC_ASSETS.includes(url.pathname)
    ) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request).then((response) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
        return;
    }

    // Default: Network First for others
});
