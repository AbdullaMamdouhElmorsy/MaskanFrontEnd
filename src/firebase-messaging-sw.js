// Import Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCv616M1k7lQlhniimarKbSJakRe3ryAMU",
  authDomain: "rehab-octoper.firebaseapp.com",
  projectId: "rehab-octoper",
  storageBucket: "rehab-octoper.firebasestorage.app",
  messagingSenderId: "821864131343",
  //appId: "1:821864131343:web:f20411d725ed7c53326c7a"
  appId: "1:821864131343:web:f1673a4b500f8486326c7a"
});

// Retrieve Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/firebase-logo.png"
  });

  // Also post the payload to all open clients so the app UI can update in real-time
  // (for example, update notification count/list in the Angular app)
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
    for (const client of clients) {
      try {
        client.postMessage({ type: 'FCM_BACKGROUND_MESSAGE', payload });
      } catch (e) {
        // ignore
      }
    }
  });
});
