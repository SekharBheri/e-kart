import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  items = [
    { id: 1, name: 'iPhone 16', price: 1000, count: 0, imageUrl: 'assets/images/item1.jpeg' },
    { id: 2, name: 'Apple Watch 9', price: 500, count: 0, imageUrl: 'assets/images/item2.jpeg' },
    { id: 3, name: 'AirPods', price: 200, count: 0, imageUrl: 'assets/images/item3.jpeg' },
    { id: 4, name: 'iPhone 17', price: 1200, count: 0, imageUrl: 'assets/images/item4.jpeg' },
    { id: 5, name: 'Apple Watch Ultra', price: 800, count: 0, imageUrl: 'assets/images/item5.jpeg' },
    { id: 6, name: 'AirPods Pro', price: 350, count: 0, imageUrl: 'assets/images/item6.jpeg' }
  ];

  cartItemCount = 0;

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.updateCartItemCount();
  }

  increaseItemCount(item: any) {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.id === item.id); // Use unique 'id' for each item
    
    if (cartItem) {
      cartItem.count++; // Increase the count of the item in the cart
    } else {
      cart.push({ ...item, count: 1 }); // Add new item to the cart with count set to 1
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  decreaseItemCount(item: any) {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.id === item.id);

    if (cartItem && cartItem.count > 0) {
      cartItem.count--; // Decrease the item count

      if (cartItem.count === 0) {
        const index = cart.indexOf(cartItem);
        cart.splice(index, 1); // Remove the item from the cart if count is 0
      }
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  // Utility method to update total cart item count
  updateCartItemCount() {
    const cart = this.getCart();
    this.cartItemCount = cart.reduce((sum: number, item: any) => sum + item.count, 0); // Sum up all item counts
  }

  // Method to get the count of a specific item from the cart
  getCartItemCount(item: any): number {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.id === item.id);
    return cartItem ? cartItem.count : 0; // Return the count or 0 if item is not found
  }

  checkout() {
    const cart = this.getCart();

    if (this.cartItemCount === 0 || cart.length === 0) {
      // Show validation message if the cart is empty
      alert('Your cart is empty! Please add items before checking out.');
    } else {
      
      this.notificationService.showConfirmation(
        'Checkout successful! Do you want to continue?',
        () => {
          // Action for "Yes" - redirect to another page
          this.router.navigate(['/shop']);
          sessionStorage.removeItem('cart'); // Clear the cart after successful checkout
          this.cartItemCount = 0; // Reset the cart item count
        },
        () => {
          // Action for "No" - redirect to another page
          this.authService.logout();
          sessionStorage.clear();    
          this.router.navigate(['/login']);
        }
      );
      
      
      
    }
  }

  // Utility methods to get and save the cart in session storage
  getCart() {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  saveCart(cart: any[]) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }
}
