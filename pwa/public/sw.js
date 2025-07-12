const CACHE_NAME = "movie-todo-pwa-v1";
const STATIC_CACHE_NAME = "static-v1";
const DYNAMIC_CACHE_NAME = "dynamic-v1";

// Define what to cache
const STATIC_ASSETS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/offline.html",
  "/logo.png",
];

const API_CACHE_URLS = ["/movies", "/todos", "/users"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("Static assets cached");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Error caching static assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME
            ) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker activated");
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (
    url.pathname.startsWith("/movies") ||
    url.pathname.startsWith("/todos") ||
    url.pathname.startsWith("/users")
  ) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle static assets
  if (
    request.destination === "document" ||
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image"
  ) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Default strategy
  event.respondWith(networkFirstStrategy(request));
});

// Network first strategy (good for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Network failed, trying cache:", error);

    // Try to get from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If it's a navigation request and we have no cached version, show offline page
    if (request.mode === "navigate") {
      return caches.match("/offline.html");
    }

    // For other requests, return a basic offline response
    return new Response(
      JSON.stringify({
        error: "Offline",
        message: "This content is not available offline",
      }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Cache first strategy (good for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log("Network failed for static asset:", error);

    // For navigation requests, return offline page
    if (request.mode === "navigate") {
      return caches.match("/offline.html");
    }

    throw error;
  }
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Background sync triggered");
    event.waitUntil(
      // Handle offline actions when back online
      syncOfflineActions()
    );
  }
});

// Push notifications (for future use)
self.addEventListener("push", (event) => {
  if (event.data) {
    const notificationData = event.data.json();

    const options = {
      body: notificationData.body,
      icon: "/logo.png",
      badge: "/logo.png",
      actions: [
        {
          action: "open",
          title: "Open App",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(notificationData.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(clients.openWindow("/"));
  }
});

// Helper function to sync offline actions
async function syncOfflineActions() {
  try {
    // Get offline actions from IndexedDB or localStorage
    const offlineActions = JSON.parse(
      localStorage.getItem("offlineActions") || "[]"
    );

    for (const action of offlineActions) {
      try {
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body,
        });

        console.log("Synced offline action:", action);
      } catch (error) {
        console.error("Failed to sync action:", error);
      }
    }

    // Clear synced actions
    localStorage.removeItem("offlineActions");
  } catch (error) {
    console.error("Error syncing offline actions:", error);
  }
}
