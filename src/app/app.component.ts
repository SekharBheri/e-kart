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
  menuOpen = false;
  currentUrl: string = '';
  notification: string | null = null;
  notificationType: string = 'default';
  confirmation: { message: string; onConfirm: () => void; onCancel: () => void } | null = null;


  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {
    this.router.events.subscribe((event) => {
      // Check current URL on navigation events
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });    

    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification.message; 
      this.notificationType = notification.type; 
      
      setTimeout(() => {
        this.notification = null;
        this.notificationType = 'default'; 
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
    return this.currentUrl.includes('/shop') || this.currentUrl.includes('/cart') 
    || this.currentUrl.includes('/myprofile') || this.currentUrl.includes('/wishlist');
  }

  logout() {
    this.authService.logout();
    sessionStorage.clear();    
    this.router.navigate(['/login']);
    this.notificationService.showNotification("You have successfully logged out!", 'success');
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
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.menuOpen = false;
  }
}
