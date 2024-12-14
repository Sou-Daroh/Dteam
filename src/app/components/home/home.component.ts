import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-steam-dark">
      <!-- Hero Section -->
      <div class="relative h-[500px] overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img src="assets/game-images/hero-banner.jpg" alt="Hero Banner" class="w-full h-full object-cover">
        <div class="absolute inset-0 flex items-center z-20">
          <div class="container mx-auto px-4">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">Welcome to Dteam</h1>
            <p class="text-xl text-gray-200 mb-8 max-w-2xl">Your ultimate place for digital gaming entertainment </p>
            <p class="text-xl text-gray-200 mb-8 max-w-2xl">Discover and play!</p>
            
            <a routerLink="/games" class="bg-steam-blue text-white px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-all">
              Explore Games
            </a>
          </div>
        </div>
      </div>

     <div class="min-h-screen bg-steam-dark">
      <!-- Featured Games Section -->
      <section class="py-8">
        <div class="container mx-auto px-4">
          <h2 class="text-2xl font-bold text-white mb-6">Featured Games</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @for (game of featuredGames; track game._id) {
              <a [routerLink]="['/game', game._id]" 
                 class="bg-steam-light rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <img [src]="game.imageUrl" [alt]="game.title" class="w-full h-48 object-cover">
                <div class="p-4">
                  <h3 class="text-xl font-bold mb-2">{{ game.title }}</h3>
                  <div class="flex flex-wrap gap-1 mb-2">
                    @for (genre of game.genres; track genre) {
                      <span class="text-xs text-gray-400 bg-steam-dark px-2 py-1 rounded">
                        {{ genre }}
                      </span>
                    }
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-green-500 font-bold">{{game.price | currency}}</span>
                    <div class="bg-blue-500 text-white px-3 py-1 rounded">
                      {{ game.rating }}/5
                    </div>
                  </div>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-bold text-steam-text mb-8">Browse by Category</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div *ngFor="let category of categories" 
               class="bg-steam-light p-6 rounded-lg text-center hover:bg-steam-blue hover:transform hover:scale-105 transition-all cursor-pointer group">
            <i [class]="category.icon + ' text-4xl text-steam-text group-hover:text-white mb-4'"></i>
            <h3 class="text-lg font-bold text-steam-text group-hover:text-white">{{ category.name }}</h3>
            <p class="text-sm text-steam-text group-hover:text-white mt-2">{{ category.count }} Games</p>
          </div>
        </div>
      </div>

        <!-- Login and Register Section -->
  <div class="bg-steam-light py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Register Card -->
        <div class="bg-steam-dark p-8 rounded-lg text-center transform hover:scale-105 transition-duration-300">
          <i class="fas fa-user-plus text-4xl text-steam-green mb-4"></i>
          <h2 class="text-3xl font-bold text-steam-text mb-4">New to Dteam?</h2>
          <p class="text-steam-text mb-6">
            Join millions of gamers and get access to exclusive deals, cloud saves, and community features.
          </p>
          <a routerLink="/register" 
             class="inline-flex items-center justify-center bg-steam-green text-white px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-all group">
            <span>Create Account</span>
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>

        <!-- Login Card -->
        <div class="bg-steam-dark p-8 rounded-lg text-center transform hover:scale-105 transition-duration-300">
          <i class="fas fa-sign-in-alt text-4xl text-steam-blue mb-4"></i>
          <h2 class="text-3xl font-bold text-steam-text mb-4">Already a Member?</h2>
          <p class="text-steam-text mb-6">
            Welcome back! Sign in to access your library and continue your gaming journey.
          </p>
          <a routerLink="/login" 
             class="inline-flex items-center justify-center bg-steam-blue text-white px-8 py-3 rounded-lg text-lg hover:bg-opacity-90 transition-all group">
            <span>Sign In</span>
            <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

      <!-- Stats Section -->
      <div class="bg-steam-light py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <h4 class="text-3xl font-bold text-steam-blue mb-2">1M+</h4>
              <p class="text-steam-text">Active Players</p>
            </div>
            <div class="text-center">
              <h4 class="text-3xl font-bold text-steam-blue mb-2">10K+</h4>
              <p class="text-steam-text">Games Available</p>
            </div>
            <div class="text-center">
              <h4 class="text-3xl font-bold text-steam-blue mb-2">24/7</h4>
              <p class="text-steam-text">Support</p>
            </div>
            <div class="text-center">
              <h4 class="text-3xl font-bold text-steam-blue mb-2">500K+</h4>
              <p class="text-steam-text">Reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class HomeComponent implements OnInit {
  featuredGames: Game[] = [];
  categories = [
    { name: 'Action', icon: 'fas fa-gamepad', count: '2.5K' },
    { name: 'Adventure', icon: 'fas fa-mountain', count: '1.8K' },
    { name: 'RPG', icon: 'fas fa-dragon', count: '1.2K' },
    { name: 'Strategy', icon: 'fas fa-chess', count: '950' },
    { name: 'Sports', icon: 'fas fa-football-ball', count: '750' },
    { name: 'Racing', icon: 'fas fa-car-side', count: '480' },
    { name: 'Simulation', icon: 'fas fa-plane', count: '620' },
    { name: 'Indie', icon: 'fas fa-star', count: '3.2K' }
  ];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getFeaturedGames().subscribe({
      next: (games) => {
        console.log('Received featured games:', games);
        this.featuredGames = games;
      },
      error: (error) => console.error('Error fetching featured games:', error)
    });
  }
}