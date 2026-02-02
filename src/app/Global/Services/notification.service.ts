import { Injectable, NgZone } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';
import { NotificationMessage } from '../Interfaces/NotificationMessage';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private afMessaging: AngularFireMessaging,
    private zone: NgZone
  ) {
    //this.listenToServiceWorkerMessages();
  }

  // Request Notification Permission and Get Token
  requestPermission(): Promise<string | null> {
    debugger;
    return new Promise((resolve, reject) => {
      this.afMessaging.requestToken
        .pipe(take(1))
        .subscribe(
          (token) => {
            console.log('FCM Token:', token);
            resolve(token);
          },
          (error) => {
            console.error('Error getting permission:', error);
            reject(error);
          }
        );
    });
  }
  listenToServiceWorkerMessages() {
   // debugger;
    const channel = new BroadcastChannel('fcm_notifications');

    channel.onmessage = (event) => {
      this.zone.run(() => {
        const payload = event.data;
        console.log('🚀 Received FCM notification in Angular:', payload);

        // TODO: Handle the notification in your app (e.g., show a snackbar or update UI)
      });
    };
}
removeViewedMessage(messageType:string,Id:number)
{
  let messages=JSON.parse(localStorage.getItem("Notficaions")||"[]") as NotificationMessage[];
  const index=messages.findIndex(m=>m.data.Type==messageType && m.data.Id==Id)
    if(index !=-1)
      messages.splice(index, 1);
    localStorage.setItem("Notficaions",JSON.stringify(messages));
}
}
