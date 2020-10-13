const CACHE_NAME = 'footballive-v1';

const urlsToCache = [
    '/',
    'index.html',
    'nav.html',
    'manifest.json',
    '/pages/home.html',
    '/pages/fixtures.html',
    '/assets/css/materialize.min.css',
    '/assets/css/style.css',
    '/assets/img/hero1.jpg',
    '/assets/icons/football-ball-32.png',
    '/assets/js/main.js',
    '/assets/js/fixtures.js',
    '/assets/js/home.js',
    '/assets/js/index.js',
    '/assets/js/init.js',
    '/assets/js/materialize.min.js',
    '/assets/js/navbar.js',
    '/assets/js/registerSW.js',
    '/assets/js/db.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://unpkg.com/idb@5/build/iife/index-min.js'
];

// menyimpan assets ke cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// menggunakan assets dari cache
self.addEventListener('fetch', event => {
    let baseUrl = 'http://api.football-data.org/v2/competitions/2021/matches?status=';

    let hosts = [
        baseUrl + '/matches?status=SCHEDULED',
        baseUrl + '/matches?status=FINISHED',
        baseUrl + '/standings'
    ];
    
    if (event.request.url.indexOf(hosts.map(host => {
        return host;
    })) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(response => {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }
});

// menghapus caches lama
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName != CACHE_NAME) {
                        console.log('SW: cache ' + cacheName + ' dihapus');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});