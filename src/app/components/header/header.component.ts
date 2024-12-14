import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { GameService, Game } from '../../services/game.service';
import { RedirectService } from '../../services/redirect.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    template: `
    <header class="bg-steam-dark py-4 relative z-50">
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
              </a>
            </div>
            <div class="mt-4 md:mt-0 flex items-center relative"> <!-- Added relative positioning -->
        <div class="relative">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (input)="onSearchInput()"
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

          <!-- Search Results Dropdown -->
          @if (showDropdown && searchResults.length > 0) {
            <div class="absolute left-0 right-0 mt-1 bg-steam-light rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
              @for (game of searchResults; track game._id) {
                <a [routerLink]="['/game', game._id]" 
                   (click)="hideDropdown()"
                   class="flex items-center p-3 hover:bg-steam-dark transition-colors border-b border-steam-border last:border-0">
                  <img [src]="game.imageUrl" 
                       [alt]="game.title" 
                       class="w-12 h-12 object-cover rounded mr-3">
                  <div>
                    <h4 class="text-steam-text font-medium">{{ game.title }}</h4>
                    <p class="text-steam-blue">{{ game.price | currency }}</p>
                  </div>
                </a>
              }
            </div>
          }
        </div>
              <!-- Only show cart icon if there are items -->
              <div class="relative" *ngIf="cartItemCount > 0">
                <button 
                  (click)="toggleCart()" 
                  class="text-steam-text hover:text-steam-blue focus:outline-none text-2xl"
                >
                  <i class="fas fa-shopping-cart"></i>
                  <span class="absolute -top-2 -right-2 bg-steam-blue text-steam-dark rounded-full px-2 py-1 text-xs font-bold">
                    {{ cartItemCount }}
                  </span>
                </button>
                
                <!-- Cart Dropdown -->
                <div *ngIf="isCartOpen" 
                     class="absolute right-0 mt-2 w-80 bg-steam-dark rounded-md shadow-lg z-50 border border-steam-border">
                  <div class="p-4">
                    <h3 class="text-steam-text font-bold mb-4">Shopping Cart</h3>
                    <div class="space-y-3">
                      <div *ngFor="let item of cartItems" 
                           class="flex items-center space-x-3 bg-steam-bg p-3 rounded">
                        <img [src]="item.imageUrl" 
                             [alt]="item.title" 
                             class="w-12 h-12 object-cover rounded">
                        <div class="flex-1">
                          <h4 class="text-steam-text text-sm font-medium">{{ item.title }}</h4>
                          <div class="flex items-center justify-between mt-1">
                            <span class="text-steam-blue">{{ item.price | currency }}</span>
                            <div class="flex items-center space-x-2">
                              <button (click)="updateQuantity(item.id, item.quantity - 1)"
                                      class="text-steam-text hover:text-steam-blue px-2">-</button>
                              <span class="text-steam-text">{{ item.quantity }}</span>
                              <button (click)="updateQuantity(item.id, item.quantity + 1)"
                                      class="text-steam-text hover:text-steam-blue px-2">+</button>
                            </div>
                          </div>
                        </div>
                        <button (click)="removeFromCart(item.id)" 
                                class="text-steam-text hover:text-red-500 transition-colors text-xl">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                      
                      <!-- Cart Total and Checkout -->
                      <div class="border-t border-steam-border pt-3 mt-3">
                        <div class="flex justify-between text-steam-text mb-3">
                          <span class="font-medium">Total:</span>
                          <span class="font-bold">{{ cartTotal | currency }}</span>
                        </div>
                        <button 
                          (click)="goToCheckout()" 
                          class="w-full bg-steam-blue text-white py-2 px-4 rounded 
                                 hover:bg-opacity-90 transition-colors font-medium"
                        >
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  searchResults: Game[] = [];
  showDropdown = false;
  isCartOpen = false;
  cartItems: CartItem[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private gameService: GameService,
    private redirectService: RedirectService
  ) {}

  ngOnInit() {
    // Setup search debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      if (query.trim()) {
        this.performSearch(query);
      } else {
        this.searchResults = [];
        this.showDropdown = false;
      }
    });

    // Subscribe to cart updates
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  onSearchInput() {
    this.searchSubject.next(this.searchQuery);
  }

  performSearch(query: string) {
    this.gameService.searchGames(query).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.showDropdown = true;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.searchResults = [];
        this.showDropdown = false;
      }
    });
  }

  hideDropdown() {
    this.showDropdown = false;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.hideDropdown();
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  get cartItemCount(): number {
    return this.cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  }

  goToCheckout() {
    this.isCartOpen = false;
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/checkout']);
    } else {
      this.redirectService.setRedirectUrl('/checkout');
      this.router.navigate(['/login']);
    }
  }
}