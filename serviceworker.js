var staticCacheName = "pwa_dice";

const filesToCache = [
	'./index.html',
	'./css/main.css',
	'./css/mediaQueries.css',
	'./css/chat.css',
	'./js/script.js',
	'./html/chat.html',
];
 
self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open(staticCacheName).then(function (cache) {
			console.log('ios');
			return cache.addAll(filesToCache);
		})
	);
});
 
self.addEventListener("fetch", function (event) {
	console.log(event.request.url);
 
	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});