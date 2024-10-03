import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-kart';
  loggedInUser: any;
  currentUrl: string = '';
  notification: string | null = null;
  confirmation: { message: string; onConfirm: () => void; onCancel: () => void } | null = null;


  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {
    this.router.events.subscribe((event) => {
      // Check current URL on navigation events
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });

    this.notificationService.notification$.subscribe((message) => {
      this.notification = message;
      setTimeout(() => {
        this.notification = null; // Hide notification after 3 seconds
      }, 3000);
    });

    this.notificationService.confirmation$.subscribe((confirmation) => {
      this.confirmation = confirmation;
    });
    
  }

  ngOnInit() {
    // Subscribe to the loggedInUser from the AuthService
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  isShopOrCartPage() {
    return this.currentUrl.includes('/shop') || this.currentUrl.includes('/cart');
  }

  logout() {
    this.authService.logout();
    sessionStorage.clear();    
    this.router.navigate(['/login']);
    this.notificationService.showNotification("You have successfully logged out!");
  }

  confirmAction() {
    if (this.confirmation) {
      this.confirmation.onConfirm();
      this.confirmation = null; // Clear confirmation after action
    }
  }

  cancelAction() {
    if (this.confirmation) {
      this.confirmation.onCancel();
      this.confirmation = null; // Clear confirmation after action
    }
  }
  
}
