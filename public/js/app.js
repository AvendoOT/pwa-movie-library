const container = document.querySelector(".container")
const movies = [{
    name: "Coda",
    image: "uploads/coda.jpg"
  },
  {
    name: "Don't Look Up",
    image: "uploads/dontlookup.jpg"
  },
  {
    name: "Power of the Dog",
    image: "uploads/potd.jpg"
  },
  {
    name: "Dune",
    image: "uploads/dune.jpg"
  },
]

const showMovies = () => {
  let output = ""
  movies.forEach(
    ({
      name,
      image
    }) =>
    (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" onClick='registerNotification()'>Notify</a>
                </div>
                `)
  )
  container.innerHTML = output
}

navigator.serviceWorker.register('../sw.js')
  .then(reg => console.log('SW registered!', reg))
  .catch(err => console.error('Error registering service worker', err));

document.addEventListener("DOMContentLoaded", showMovies);

function registerNotification() {
  Notification.requestPermission(permission => {
    if (permission === 'granted') {
      registerBackgroundSync()
    } else console.error("Permission was not granted.")
  })
}

function registerBackgroundSync() {
  if (!navigator.serviceWorker) {
    return console.error("Service Worker not supported")
  }

  navigator.serviceWorker.ready
    .then(registration => registration.sync.register('getRandomNumber'))
    .then(() => console.log("Registered background sync"))
    .catch(err => console.error("Error registering background sync", err))
}