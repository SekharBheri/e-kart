import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ConfirmationNotification {
  message: string;  
  onConfirm: () => void;
  onCancel: () => void;
}

interface Notification {
  message: string;
  type: string; // Notification type: 'success', 'error', 'info', 'default'
}

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$ = this.notificationSubject.asObservable();

  private confirmationSubject = new Subject<ConfirmationNotification>();
  confirmation$ = this.confirmationSubject.asObservable();

  showNotification(message: string, type: string = 'default') {
    this.notificationSubject.next({message, type });
    
  }

  showConfirmation(message: string, onConfirm: () => void, onCancel: () => void) {
    this.confirmationSubject.next({ message, onConfirm, onCancel });
  }
}

