import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html'
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];

  ngOnInit() {
    this.loadWishlist();
  }

  // Load wishlist from sessionStorage
  loadWishlist() {
    const wishlist = this.getWishlist();
    this.wishlistItems = wishlist;
  }

  // Utility method to get the wishlist from sessionStorage
  getWishlist() {
    return JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  }

  // Utility method to remove an item from the wishlist
  removeFromWishlist(item: any) {
    const wishlist = this.getWishlist();
    const index = wishlist.findIndex((i: any) => i.id === item.id);

    if (index !== -1) {
      wishlist.splice(index, 1);  // Remove item
      this.saveWishlist(wishlist); // Save updated wishlist
      this.loadWishlist();         // Reload the wishlist
    }
  }

  // Save the updated wishlist to sessionStorage
  saveWishlist(wishlist: any[]) {
    sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
}
