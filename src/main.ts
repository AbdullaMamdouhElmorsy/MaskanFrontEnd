/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { AppModule } from './app/app.module';
import { environment } from './app/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const messaging = getMessaging(app);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker Registered!', registration);
      })
      .catch(err => console.log('Service Worker Registration Failed:', err));
  } else {
    console.log('Service Worker is not supported in this browser.');
  }

  onMessage(messaging, (payload) => {
   // console.log('Message received in foreground:', payload);
    alert(payload.notification?.title);
  });