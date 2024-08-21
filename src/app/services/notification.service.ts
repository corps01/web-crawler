import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<any>();
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io('https://notification-server-gh0i.onrender.com/', {
      withCredentials: true,
      transports: ['websocket', 'polling'],
    }); // Update with your server's URL

    this.listenForNotifications();
  }

  private listenForNotifications(): void {
    this.socket.on('notification', (data: any) => {
      console.log('notifications --->', data);
      this.notificationSubject.next(data);
    });
  }

  getNotifications(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
