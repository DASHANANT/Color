self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("color-quiz-cache").then(cache => {
      return cache.addAll(["index.html", "learn.html", "script.js", "manifest.json", "correct.mp3", "wrong.mp3", "icon.png"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
