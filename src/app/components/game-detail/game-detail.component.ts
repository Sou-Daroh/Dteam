import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router  } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-steam-dark py-8">
      <div class="container mx-auto px-4">
        @if (loading) {
          <div class="text-center text-white">Loading...</div>
        } @else if (error) {
          <div class="text-center text-red-500">{{ error }}</div>
        } @else if (game) {
          <div class="bg-steam-light rounded-lg overflow-hidden max-w-4xl mx-auto"> 
            <!-- Game Header - Image -->
            <div class="relative">
              <img [src]="game.imageUrl" [alt]="game.title" 
                   class="w-full object-contain bg-black">
            </div>

           <!-- Title, Genre, and Rating Section -->
            <div class="p-6 border-b border-steam-dark">
              <div class="flex justify-between items-start">
                <div>
                  <h1 class="text-4xl font-bold text-steam-text mb-2">{{game.title}}</h1>
                  <div class="flex flex-wrap gap-2">
                    @for (genre of game.genres; track genre) {
                      <span class="text-sm text-steam-text opacity-80 bg-steam-dark px-2 py-1 rounded">
                        {{genre}}
                      </span>
                    }
                  </div>
                </div>
                <div class="text-right flex flex-col items-end">
                  <!-- Rating Container -->
                  <div class="flex items-center space-x-2 mb-2">
                    <div class="flex items-center bg-steam-dark rounded-lg px-3 py-2">
                      <i class="fas fa-star text-yellow-400 mr-2"></i>
                      <span class="text-xl font-bold text-steam-text">{{game.rating}}</span>
                      <span class="text-sm text-steam-text opacity-80 ml-1">/5</span>
                    </div>
                  </div>
                  <!-- Release Date -->
                  <p class="text-sm text-steam-text opacity-80">
                    Released: {{game.releaseDate | date:'mediumDate'}}
                  </p>
                </div>
              </div>
            </div>

            <!-- Game Details -->
            <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Description and Features -->
              <div class="md:col-span-2">
                <h2 class="text-2xl font-bold text-steam-text mb-4">About This Game</h2>
                <p class="text-steam-text mb-6">{{game.description}}</p>
                
                <!-- Features Section -->
                <div class="mt-6">
                  <h3 class="text-xl font-bold text-steam-text mb-3">Features</h3>
                  <div class="flex flex-wrap gap-2">
                    @for (feature of game.features; track feature) {
                      <span class="bg-steam-dark text-steam-text px-3 py-1 rounded-full text-sm">
                        {{ feature }}
                      </span>
                    }
                  </div>
                </div>
              </div>

              <!-- Purchase Section -->
              <div class="bg-steam-dark p-4 rounded-lg">
                <div class="mb-4">
                  <p class="text-lg text-steam-text mb-2">Price:</p>
                  <div class="flex items-center gap-2">
                    @if (game.discount) {
                      <span class="bg-green-600 text-white px-2 py-1 rounded">
                        -{{game.discount}}%
                      </span>
                      <div class="flex flex-col">
                        <span class="text-sm text-steam-text line-through">
                          {{game.originalPrice | currency}}
                        </span>
                        <span class="text-2xl font-bold text-steam-blue">
                          {{game.price | currency}}
                        </span>
                      </div>
                    } @else {
                      <span class="text-2xl font-bold text-steam-blue">
                        {{game.price | currency}}
                      </span>
                    }
                  </div>
                </div>
                <button (click)="addToCart()" 
                        class="w-full bg-steam-blue text-white py-3 rounded-lg hover:bg-opacity-90 transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class GameDetailComponent implements OnInit {
  game: Game | null = null;
  error: string | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Game ID from route:', id); 

    if (!id) {
      this.error = 'Game ID not found';
      this.loading = false;
      return;
    }

    this.gameService.getGameById(id).subscribe({
      next: (game) => {
        console.log('Received game:', game); 
        this.game = game;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading game:', error);
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  addToCart() {
    if (this.game) {
      this.cartService.addToCart({
        id: this.game._id,
        title: this.game.title,
        price: this.game.price,
        quantity: 1,
        imageUrl: this.game.imageUrl
      });
      this.toastService.show(`${this.game.title} added to cart`, 'success');
    }
  }
}