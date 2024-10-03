import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface ConfirmationNotification {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  private confirmationSubject = new Subject<ConfirmationNotification>();
  confirmation$ = this.confirmationSubject.asObservable();

  showNotification(message: string) {
    this.notificationSubject.next(message);
  }

  showConfirmation(message: string, onConfirm: () => void, onCancel: () => void) {
    this.confirmationSubject.next({ message, onConfirm, onCancel });
  }
}

