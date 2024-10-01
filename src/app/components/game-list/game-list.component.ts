import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Game {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl font-bold mb-6 text-steam-text">Featured Games</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div *ngFor="let game of games" class="bg-steam-dark rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
          <div class="aspect-w-16 aspect-h-9">
            <img [src]="game.imageUrl" [alt]="game.title" class="object-contain w-full h-full">
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 text-steam-text">{{ game.title }}</h3>
            <p class="text-steam-blue font-bold">{{ game.price | currency }}</p>
            <a [routerLink]="['/game', game.id]" class="btn mt-2 inline-block">View Game</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .aspect-w-16 {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
      overflow: hidden; /* Ensure the aspect ratio doesn't overflow */
    }
    .aspect-h-9 {
      height: 0; /* Remove height to use padding-bottom for aspect ratio */
    }
    .aspect-w-16 img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: contain; /* Change to contain to fit entire image */
      transform: translate(-50%, -50%); /* Center the image */
    }
  `]
})
export class GameListComponent {
  games: Game[] = [
    { id: 1, title: 'Cyberpunk 2077', price: 59.99, imageUrl: 'assets/game-images/cyberpunk2077.jpg' },
    { id: 2, title: 'The Witcher 3: Wild Hunt', price: 39.99, imageUrl: 'assets/game-images/witcher3.jpg' },
    { id: 3, title: 'Red Dead Redemption 2', price: 59.99, imageUrl: 'assets/game-images/rdr2.jpg' },
    { id: 4, title: 'Stray', price: 29.99, imageUrl: 'assets/game-images/stray.jpg' },
    { id: 5, title: 'Stardew Valley', price: 14.99, imageUrl: 'assets/game-images/stardewvalley.jpg' },
    { id: 6, title: 'Elden Ring', price: 59.99, imageUrl: 'assets/game-images/eldenring.jpg' },
  ];
}
