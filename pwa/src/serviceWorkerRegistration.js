const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register() {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log("PWA: Service worker is ready");
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log("PWA: Service worker registered");

      // Check for updates
      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        installingWorker.addEventListener("statechange", () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // New content is available; please refresh
              showUpdateMessage();
            } else {
              // Content is cached for offline use
              console.log("PWA: Content is cached for offline use");
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error("PWA: Service worker registration failed:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        "PWA: No internet connection found. App is running in offline mode."
      );
    });
}

function showUpdateMessage() {
  const updateMessage = document.createElement("div");
  updateMessage.id = "pwa-update-message";
  updateMessage.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 300px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    ">
      <div style="margin-bottom: 10px; font-weight: 600;">
        New version available!
      </div>
      <div style="font-size: 14px; margin-bottom: 15px;">
        A new version of the app is available. Refresh to update.
      </div>
      <button onclick="window.location.reload()" style="
        background: white;
        color: #007bff;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        margin-right: 10px;
      ">
        Refresh
      </button>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">
        Later
      </button>
    </div>
  `;

  document.body.appendChild(updateMessage);

  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (document.getElementById("pwa-update-message")) {
      document.getElementById("pwa-update-message").remove();
    }
  }, 10000);
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Online/Offline detection
export function setupNetworkDetection() {
  function updateNetworkStatus() {
    if (navigator.onLine) {
      document.body.classList.remove("offline");
      document.body.classList.add("online");
      showNetworkMessage("🌐 You are back online!", "success");
    } else {
      document.body.classList.remove("online");
      document.body.classList.add("offline");
      showNetworkMessage(
        "📡 You are offline. Some features may be limited.",
        "warning"
      );
    }
  }

  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
  updateNetworkStatus();
}

function showNetworkMessage(message, type) {
  const existingMessage = document.getElementById("network-status-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const networkMessage = document.createElement("div");
  networkMessage.id = "network-status-message";
  networkMessage.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      left: 20px;
      background: ${type === "success" ? "#28a745" : "#ffc107"};
      color: ${type === "success" ? "white" : "#212529"};
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      max-width: 300px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      font-size: 14px;
      font-weight: 500;
    ">
      ${message}
    </div>
  `;

  document.body.appendChild(networkMessage);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (document.getElementById("network-status-message")) {
      document.getElementById("network-status-message").remove();
    }
  }, 3000);
}
