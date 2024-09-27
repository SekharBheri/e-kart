import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router) {}

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
      // Show validation message if the cart is empty
      alert('Your cart is empty! Please add items before checking out.');
    } else {
      // If cart contains items, show checkout success message and return to the shop page
      alert('Checkout successful!');
      this.router.navigate(['/shop']); // Navigate back to the shop page
         
    }
  }
  
}
