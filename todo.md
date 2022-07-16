### Steps
1. create a manifest.json file and add to the index.html head tag [https://app-manifest.firebaseapp.com/]
``` json
{
    "name": "Weather-app",
    "short_name": "Weather",
    "description": "A simple app to check Weather",
    "icons": [
        {
            "src": "assets/img/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any maskable"
        },
        {
            "src": "assets/img/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "background_color": "#ec4899",
    "theme_color": "#7a61f3",
    "display": "fullscreen",
    "orientation": "any",
    "start_url": ".",
    "url": "index.html",
    "scope": ".",
    "lang": "en",
    "dir": "rtl"
}
```

2. create a sw.js file and add load it via the main script (usually in index.html, main or app.js)
``` js
if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/serviceworker.js") // returns a promise
            .then((reg) => {
                console.log('PWA service worker ready');
                reg.update();
            })
            .catch((e) => console.log(e));
        });

         // Check user internet status (online/offline)
         function updateOnlineStatus(event) {
            if (!navigator.onLine) {
                alert('Internet access is not possible!')
            }
        }

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
      }
```

3. make our service worker do the actual work
``` js
const CACHE_NAME = 'weather-v1'
const urlsToCache = ['index.html', 'app.js', 'offline.html']

const self = this;

// Install our Servicer Worker
self.addEventListener('install', (event) => {
    console.log("Starting Installation...")
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Successfully Caached Files') 
            // this should run once which is after it has cached the files
            // and also present in the Cache Storage

            return cache.addAll(urlsToCache)
        })
    )
})



// Activate our service worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = []
    cacheWhitelist.push(CACHE_NAME)
    console.log("Starting Activation...")
    event.waitUntil(
        caches.keys().then((cacheName) => Promise.all(
            cacheName.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})


// Listen for Request 
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then(() => {
            console.log(event.request)
            return fetch(event.request)
            .catch(() => caches.match('offline.html'))
        })
    )

})


```

