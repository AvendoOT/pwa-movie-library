const staticDevCache = "dev-movie-library-site-v1"
const assets = [
    "/",
    "/index.html",
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

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});