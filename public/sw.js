const staticDevCache = "dev-movie-library-site-v1"
const assets = [
  "/",
  "manifest.json",
  "index.html",
  "geolocation.html",
  "404.html",
  "offline.html",
  "/css/style.css",
  "/js/app.js",
  "/uploads/coda.jpg",
  "/uploads/dontlookup.jpg",
  "/uploads/dune.jpg",
  "/uploads/potd.jpg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCache).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("activate", (event) => {
  console.log("**   Activating new service worker... **");
  const cacheWhitelist = [staticDevCache];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
    .match(event.request)
    .then((response) => {
      if (response) {
        console.log("Found " + event.request.url + " in cache!");
        return response;
      }
      console.log("----------------->> Network request for ",
        event.request.url
      );
      return fetch(event.request).then((response) => {
        console.log("response.status = " + response.status);
        if (response.status === 404) {
          return caches.match("404.html");
        }
        return caches.open(staticDevCache).then((cache) => {
          console.log(">>> Caching: " + event.request.url);
          cache.put(event.request.url, response.clone());
          return response;
        });
      }).catch((error) => {
        console.log("Error", event.request.url, error);
        return caches.match("offline.html");
      });
    })
    .catch((error) => {
      console.log("Error", event.request.url, error);
      return caches.match("offline.html");
    })
  );
});

self.addEventListener('sync', function (event) {
  console.log("sync event", event);
  if (event.tag === 'getRandomNumber') {
    event.waitUntil(getRandomNumber());
  }
});

let getRandomNumber = async function () {
  self.registration.showNotification(Math.random());
};