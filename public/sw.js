importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Workbox is loaded`);
}

workbox.routing.registerRoute(
    new RegExp('^https://newsapi.org'),

    new workbox.strategies.CacheFirst({
      cacheName: 'api-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ]
    })
);

workbox.routing.registerRoute(
    /\.(?:js|css|html)$/,
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
);