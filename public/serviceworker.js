const CACH_NAME = "MY_CACHE"
const URLtoCache = [ 'index.html' , 'offline.html']
const self = this
//Instalation

self.addEventListener('install', event =>{
    event.waitUntil( caches.open(CACH_NAME)
        .then(cache => {
            console.log('opened cache')
            return cache.addAll(URLtoCache)
        })
    )
})
//Listen for request 

self.addEventListener('fetch', event =>{
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request).catch(()=> caches.match('offline.html'))
            })
    )
})
//Activate de Service Worker

self.addEventListener('activate', event =>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACH_NAME)

    event.waitUntil(
        caches.keys().then(cacheNames =>Promise.all(
            cacheNames.map(cacheName =>{
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})
