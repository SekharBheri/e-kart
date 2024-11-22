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
    const cartItem = cart.find((i: any) => i.id === item.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cart.push({ ...item, count: 1 });
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  decreaseItemCount(item: any) {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.id === item.id);

    if (cartItem && cartItem.count > 0) {
      cartItem.count--;

      if (cartItem.count === 0) {
        const index = cart.indexOf(cartItem);
        cart.splice(index, 1);
      }
    }

    this.saveCart(cart);
    this.updateCartItemCount();
  }

  updateCartItemCount() {
    const cart = this.getCart();
    this.cartItemCount = cart.reduce((sum: number, item: any) => sum + item.count, 0);
  }

  getCartItemCount(item: any): number {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.id === item.id);
    return cartItem ? cartItem.count : 0;
  }

  checkout() {
    const cart = this.getCart();
    if (this.cartItemCount === 0 || cart.length === 0) {
      this.notificationService.showNotification("Your cart is empty! Please add items before checking out.", "error");
    } else {
      this.notificationService.showConfirmation(
        'Checkout successful! Do you want to continue?',
        () => {
          this.router.navigate(['/shop']);
          sessionStorage.removeItem('cart');
          this.cartItemCount = 0;
        },
        () => {
          this.authService.logout();
          sessionStorage.clear();    
          this.router.navigate(['/login']);
          this.notificationService.showNotification("You have successfully logged out!", 'success');
        }
      );
    }
  }

  getCart() {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  saveCart(cart: any[]) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
  }

  // Wishlist Methods
  toggleWishlist(item: any) {
    const wishlist = this.getWishlist();
    const index = wishlist.findIndex((i: any) => i.id === item.id);

    if (index === -1) {
      wishlist.push(item);  // Add item to wishlist
    } else {
      wishlist.splice(index, 1);  // Remove item from wishlist
    }

    this.saveWishlist(wishlist);
  }

  isInWishlist(item: any): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some((i: any) => i.id === item.id);
  }

  // Utility methods to manage wishlist in session storage
  getWishlist() {
    return JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  }

  saveWishlist(wishlist: any[]) {
    sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
}
