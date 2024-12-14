import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-steam-dark py-8">
      <div class="container mx-auto px-4 text-center">
        <div class="bg-steam-light p-8 rounded-lg max-w-2xl mx-auto">
          <h1 class="text-3xl font-bold text-steam-text mb-4">Order Successful!</h1>
          <p class="text-steam-text mb-6">Thank you for your purchase.</p>
          <a routerLink="/games" 
             class="bg-steam-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  `
})
export class CheckoutSuccessComponent {} 