import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  removeFromCart(index: number) {
    const cartItem = this.cartItems[index];
    if (cartItem.count > 1) {
      cartItem.count--; // Decrease the count if more than 1
    } else {
      this.cartItems.splice(index, 1); // Remove item if count reaches 0
    }
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  
  getTotalAmount() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.count), 0);
  }

  checkout() {
       
    if (this.cartItems.length === 0 ) {      
      this.notificationService.showNotification("Your cart is empty! Please add items before checking out.", "error");
    } else {
      
      this.notificationService.showConfirmation(
        'Checkout successful! Do you want to continue?',
        () => {
          // Action for "Yes" - redirect to another page
          this.router.navigate(['/shop']);
        },
        () => {
          // Action for "No" - redirect to another page
          this.authService.logout();
          sessionStorage.clear();    
          this.router.navigate(['/login']);
          this.notificationService.showNotification("You have successfully logged out!", 'success');
        }
      );

      //this.router.navigate(['/shop']); // Navigate back to the shop page
         
    }
  }
  
}
