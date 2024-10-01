import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

interface Game {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="game" class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6 text-steam-text">{{ game.title }}</h1>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2 lg:w-2/5">
          <img [src]="game.imageUrl" [alt]="game.title" class="w-full h-auto" style="max-width: 300px; margin: 0 auto; display: block;">
        </div>
        <div class="md:w-1/2 lg:w-3/5">
          <p class="text-lg mb-4 text-steam-text">{{ game.description }}</p>
          <p class="text-3xl font-bold text-steam-blue mb-4">{{ game.price | currency }}</p>
          <button (click)="addToCart()" class="btn w-full md:w-auto text-lg py-2 px-6">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .btn {
      background-color: #66c0f4;
      color: #171a21;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #1a9fff;
    }
  `]
})
export class GameDetailComponent implements OnInit {
  game: Game | undefined;

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    const gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.game = this.getGameById(gameId);
  }

  getGameById(id: number): Game | undefined {
    const games: Game[] = [
      { 
        id: 1, 
        title: 'Cyberpunk 2077', 
        price: 59.99, 
        imageUrl: 'assets/game-images/cyberpunk2077.jpg', 
        description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.'
      },
      { 
        id: 2, 
        title: 'The Witcher 3: Wild Hunt', 
        price: 39.99, 
        imageUrl: 'assets/game-images/witcher3.jpg', 
        description: 'An action role-playing game set in an open world environment. You play as Geralt of Rivia, a monster hunter known as a Witcher.'
      },
      { 
        id: 3, 
        title: 'Red Dead Redemption 2', 
        price: 59.99, 
        imageUrl: 'assets/game-images/rdr2.jpg', 
        description: "An epic tale of life in America's unforgiving heartland."
      },
      { 
        id: 4, 
        title: 'Stray', 
        price: 29.99, 
        imageUrl: 'assets/game-images/stray.jpg', 
        description: 'Lost, alone and separated from family, a stray cat must untangle an ancient mystery to escape a long-forgotten cybercity.'
      },
      { 
        id: 5, 
        title: 'Stardew Valley', 
        price: 14.99, 
        imageUrl: 'assets/game-images/stardewvalley.jpg', 
        description: "You've inherited your grandfather's old farm plot in Stardew Valley."
      },
      { 
        id: 6, 
        title: 'Elden Ring', 
        price: 59.99, 
        imageUrl: 'assets/game-images/eldenring.jpg', 
        description: 'An action role-playing game developed by FromSoftware.'
      },
    ];
    return games.find(game => game.id === id);
  }

  addToCart() {
    if (this.game) {
      const item: CartItem = {
        title: this.game.title,
        price: this.game.price,
        quantity: 1, // You can modify this as needed
      };
      this.cartService.addToCart(item);
    }
  }
}
