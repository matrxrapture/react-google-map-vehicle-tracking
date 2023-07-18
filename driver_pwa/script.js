// This code will cache the app's assets so that they can be accessed
// even when the user is offline.
// This code will request permission from the user to send push notifications.
// If the user grants permission, the code will subscribe the user to push notifications.

function requestPushPermission() {
  Notification.requestPermission().then(function(permission) {
    if (permission === "granted") {
      subscribeToPushNotifications();
    }
  });
}

// This code will subscribe the user to push notifications.
// The subscription will be stored in the service worker.

function subscribeToPushNotifications() {
  navigator.serviceWorker.ready.then(function(serviceWorker) {
    serviceWorker.pushManager.subscribe().then(function(subscription) {
      console.log("Subscribed to push notifications");
    });
  });
}

// This code will handle push notifications that are received by the app.
// The notification will be displayed to the user.

function handlePushNotification(event) {
  var notification = event.notification;
  notification.onclick = function() {
    // Do something when the notification is clicked.
  };
  notification.show();
}

self.addEventListener('install', function(event) {
    event.waitUntil(
      cache.open('my-pwa').then(function(cache) {
        cache.addAll([
          '/index.html',
          '/style.css',
          '/script.js',
        ]);
      }),
      self.registration.pushManager.getSubscription().then(function(subscription) {
        if (subscription) {
          // The user is already subscribed to push notifications.
        } else {
          // The user is not subscribed to push notifications.
          requestPushPermission();
        }
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      cache.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  // This code will be executed when the service worker receives a push notification.
// The code will handle the notification.

self.addEventListener('push', function(event) {
  handlePushNotification(event);
});

// This code will ask the user for permission to track their location.
// If the user grants permission, the code will store the location in a variable.

function askForLocationPermission() {
  navigator.geolocation.getCurrentPosition(
    function(position) {
      // The user has granted permission to track their location.
      var location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        bearing: position.coords.bearing,
      };
      sendLocationToAPI(location);
    },
    function(error) {
      // The user has denied permission to track their location.
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
}

// This code will send the location to the API.

function sendLocationToAPI(location) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://joy-driver-tracking-server-gb6dkzvuza-uc.a.run.app/api/post_location");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(location));
}

// This code will be executed when the user clicks the "Allow" button.

function onAllowButtonClick() {
  askForLocationPermission();
}

// This code will be executed when the user clicks the "Deny" button.

function onDenyButtonClick() {
  // Do nothing.
}
function radians(n) {
  return n * (Math.PI / 180);
}
function degrees(n) {
  return n * (180 / Math.PI);
}

// function getBearing(startLat,startLong,endLat,endLong){
//   startLat = radians(startLat);
//   startLong = radians(startLong);
//   endLat = radians(endLat);
//   endLong = radians(endLong);

//   var dLong = endLong - startLong;

//   var dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
//   if (Math.abs(dLong) > Math.PI){
//     if (dLong > 0.0)
//        dLong = -(2.0 * Math.PI - dLong);
//     else
//        dLong = (2.0 * Math.PI + dLong);
//   }

//   return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
