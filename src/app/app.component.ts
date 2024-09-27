import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-kart';
  loggedInUser: any;
  currentUrl: string = '';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      // Check current URL on navigation events
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
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
    sessionStorage.clear(); // Clear all session storage data
   // localStorage.removeItem('loggedInUser');  // Optionally clear logged-in user details
    this.router.navigate(['/login']);
  }
  
}
