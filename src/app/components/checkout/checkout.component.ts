import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Include CommonModule and FormsModule
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6 text-steam-text">Checkout</h1>
      <form (ngSubmit)="onSubmit(checkoutForm)" #checkoutForm="ngForm">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" [(ngModel)]="name" name="name" required class="w-full border border-gray-300 p-2 rounded">
        </div>
        <div>
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" [(ngModel)]="cardNumber" name="cardNumber" required class="w-full border border-gray-300 p-2 rounded">
        </div>
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
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Complete Purchase</button>
        </div>
        <ng-template #emptyCart>
          <p>Your cart is empty.</p>
        </ng-template>
      </form>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  name: string = '';
  cardNumber: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      alert(`Thank you for your purchase, ${this.name}! Your total is ${this.cartTotal}.`);
      // Handle the payment processing logic here
      this.cartService.clearCart(); // Optionally clear the cart after purchase
      form.reset(); // Reset the form after submission
    }
  }
}
