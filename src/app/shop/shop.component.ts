import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  items = [
    { name: 'iPhone 16', price: 1000, count: 0, imageUrl: 'assets/images/item1.jpeg' },
    { name: 'Apple Watch 9', price: 500, count: 0, imageUrl: 'assets/images/item2.jpeg' },
    { name: 'AirPods', price: 200, count: 0, imageUrl: 'assets/images/item3.jpeg' },
    { name: 'iPhone 16', price: 1000, count: 0, imageUrl: 'assets/images/item4.jpeg' },
    { name: 'Apple Watch 9', price: 500, count: 0, imageUrl: 'assets/images/item5.jpeg' },
    { name: 'AirPods', price: 350, count: 0, imageUrl: 'assets/images/item6.jpeg' }
  ];
  
  cartItemCount = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateCartItemCount();
  }

  increaseItemCount(item: any) {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.name === item.name);
  
    if (cartItem) {
      cartItem.count++; // Increase the count of the item in the cart
    } else {
      item.count = 1; // If the item doesn't exist, set count to 1
      cart.push({ ...item });
    }
  
    this.saveCart(cart);
    this.updateCartItemCount();
  }

  decreaseItemCount(item: any) {
    const cart = this.getCart();
    const cartItem = cart.find((i: any) => i.name === item.name);
  
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
    const cartItem = cart.find((i: any) => i.name === item.name);
    return cartItem ? cartItem.count : 0; // Return the count or 0 if item is not found
  }

  checkout() {
    const cart = this.getCart();
    
    if (this.cartItemCount === 0 || cart.length === 0) {
      // Show validation message if the cart is empty
      alert('Your cart is empty! Please add items before checking out.');
    } else {
      // If cart contains items, show checkout success message and return to the shop page
      alert('Checkout successful!');
      this.router.navigate(['/shop']); // Navigate back to the shop page
      sessionStorage.removeItem('cart'); // Clear the cart after successful checkout
      this.cartItemCount = 0; // Reset the cart item count
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
