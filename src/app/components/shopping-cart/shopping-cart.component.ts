import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-shopping-cart',
    imports: [CommonModule],
    template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6 text-steam-text">Shopping Cart</h1>
      <div *ngIf="cartItems.length > 0; else emptyCart">
        <ul class="mb-4">
          <li *ngFor="let item of cartItems" class="flex justify-between mb-2">
            {{ item.title }} - {{ item.price | currency }} x {{ item.quantity }}
          </li>
        </ul>
        <div class="flex justify-between font-bold">
          <span>Total:</span>
          <span>{{ cartTotal | currency }}</span>
        </div>
        <button (click)="goToCheckout()" class="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Proceed to Checkout
        </button>
      </div>
      <ng-template #emptyCart>
        <p>Your cart is empty.</p>
      </ng-template>
    </div>
  `,
    styles: [``]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']); // Navigate to the checkout route
  }
}
