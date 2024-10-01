import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <header class="bg-steam-dark py-4">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between flex-wrap">
          <a routerLink="/" class="flex items-center text-2xl font-bold text-steam-blue">
            <img src="assets/game-images/images/dteam-logo.png" 
                alt="Dteam Logo" 
                class="w-10 h-10 mr-4">
            Dteam
          </a>

          <div class="w-full flex-grow md:w-auto md:flex md:items-center md:justify-between ml-8">
            <div class="text-sm md:flex-grow">
              <a routerLink="/" class="block mt-4 md:inline-block md:mt-0 text-steam-text hover:text-steam-blue mr-4">
                Home
              </a>
              <a routerLink="/games" class="block mt-4 md:inline-block md:mt-0 text-steam-text hover:text-steam-blue mr-4">
                Games
              </a>
            </div>
            <div class="mt-4 md:mt-0 flex items-center">
              <input 
                type="text" 
                [(ngModel)]="searchQuery" 
                (keyup.enter)="onSearch()"
                placeholder="Search games..." 
                class="bg-steam-bg text-steam-text px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-steam-blue"
              >
              <button 
                (click)="onSearch()" 
                class="bg-steam-blue text-steam-dark px-4 py-2 rounded-r-md hover:bg-opacity-80 transition duration-300 mr-4"
              >
                Search
              </button>
              <div class="relative">
                <button 
                  (click)="toggleCart()" 
                  class="text-steam-text hover:text-steam-blue focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span class="absolute -top-2 -right-2 bg-steam-blue text-steam-dark rounded-full px-2 py-1 text-xs font-bold">
                    {{ cartItemCount }}
                  </span>
                </button>
                <div *ngIf="isCartOpen" class="absolute right-0 mt-2 w-64 bg-steam-dark rounded-md shadow-lg z-10">
                  <div class="p-4">
                    <h3 class="text-steam-text font-bold mb-2">Shopping Cart</h3>
                    <ul>
                      <li *ngFor="let item of cartItems">
                        {{ item.title }} - {{ item.price | currency }} x {{ item.quantity }}
                      </li>
                    </ul>
                    <div class="mt-2 border-t border-steam-text pt-2">
                      <strong>Total: {{ cartTotal | currency }}</strong>
                    </div>
                    <!-- Checkout Button -->
                    <button 
                      (click)="goToCheckout()" 
                      class="mt-2 bg-steam-blue text-steam-dark px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  cartItems: CartItem[] = [];
  isCartOpen = false;

  constructor(private cartService: CartService, private router: Router) {} // Inject Router

  ngOnInit() {
    this.cartService.getCart().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  get cartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Method to navigate to the checkout page
  goToCheckout() {
    this.router.navigate(['/checkout']); // Navigate to the checkout route
  }
}
