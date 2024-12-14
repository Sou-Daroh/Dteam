import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService, Game } from '../../services/game.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-steam-dark py-8">
      <div class="container mx-auto px-4">
        <!-- Filters -->
        <div class="bg-steam-light p-4 rounded-lg mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Genre Filter -->
            <div class="relative">
              <select 
                [(ngModel)]="activeFilters.genre"
                (change)="onFilterChange()"
                class="w-full bg-steam-dark text-steam-text px-4 py-2 rounded appearance-none cursor-pointer">
                <option value="">All Genres</option>
                <option *ngFor="let genre of genres">{{ genre }}</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-steam-text"></i>
            </div>

            <!-- Price Range -->
            <div class="relative">
              <select 
                [(ngModel)]="activeFilters.priceRange"
                (change)="onFilterChange()"
                class="w-full bg-steam-dark text-steam-text px-4 py-2 rounded appearance-none cursor-pointer">
                <option value="">Any Price</option>
                <option value="free">Free</option>
                <option value="under10">Under $10</option>
                <option value="under20">Under $20</option>
                <option value="under30">Under $30</option>
                <option value="under60">Under $60</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-steam-text"></i>
            </div>

            <!-- Features -->
            <div class="relative">
              <select 
                [(ngModel)]="activeFilters.features"
                (change)="onFilterChange()"
                class="w-full bg-steam-dark text-steam-text px-4 py-2 rounded appearance-none cursor-pointer">
                <option value="">Features</option>
                <option value="multiplayer">Multiplayer</option>
                <option value="singleplayer">Single Player</option>
                <option value="controller">Controller Support</option>
                <option value="cloud">Cloud Saves</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-steam-text"></i>
            </div>

            <!-- Sort By -->
            <div class="relative">
              <select 
                [(ngModel)]="activeFilters.sortBy"
                (change)="onFilterChange()"
                class="w-full bg-steam-dark text-steam-text px-4 py-2 rounded appearance-none cursor-pointer">
                <option value="relevance">Sort by Relevance</option>
                <option value="release">Release Date</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-steam-text"></i>
            </div>
          </div>
        </div>

        <!-- Games Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          @for (game of filteredGames; track game._id) {
            <div class="game-card">
              <a [routerLink]="['/game', game._id]">
                <div class="bg-steam-light rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div class="relative">
                    <img [src]="game.imageUrl" [alt]="game.title" class="w-full h-48 object-cover">
                    <div *ngIf="game.discount" 
                         class="absolute top-2 right-2 bg-steam-green text-white px-2 py-1 rounded">
                      -{{ game.discount }}%
                    </div>
                  </div>
                  <div class="p-4">
                    <h3 class="text-lg font-bold text-steam-text mb-2">{{ game.title }}</h3>
                    <div class="flex justify-between items-center">
                      <div class="flex items-center space-x-2">
                        <span *ngIf="game.discount" class="text-steam-text line-through text-sm">
                          {{ game.originalPrice | currency }}
                        </span>
                        <span class="text-steam-blue font-bold">
                          {{ game.price | currency }}
                        </span>
                      </div>
                      <div class="flex items-center space-x-1">
                        <i class="fas fa-star text-yellow-400"></i>
                        <span class="text-steam-text">{{ game.rating }}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          }
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-8">
          <button class="bg-steam-blue text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all">
            Load More Games
          </button>
        </div>
      </div>
    </div>
  `
})

export class GameListComponent implements OnInit {
  games: Game[] = [];

  genres = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Open World',
    'Fantasy',
    'Horror',
    'Indie',
    'Simulation',
    'Platformer',
    'Puzzle',
    'Casual',
    'Story Rich',
    'Roguelike',
    'Metroidvania',
    'Survival Horror',
    'Farming Sim',
    'Western',
    'Action RPG'
  ];

  activeFilters = {
    genre: '',
    priceRange: '',
    features: '',
    sortBy: 'relevance'
  };

  constructor(private gameService: GameService) {}

  get filteredGames() {
    let filtered = [...this.games];
    console.log('Initial games:', filtered); // Debug log

    // Apply genre filter
    if (this.activeFilters.genre) {
      filtered = filtered.filter(game => {
        console.log('Filtering genre:', game.genres, this.activeFilters.genre);
        return game.genres.includes(this.activeFilters.genre);
      });
    }

    // Apply price range filter
    if (this.activeFilters.priceRange) {
      filtered = filtered.filter(game => {
        const price = game.price || 0;
        console.log('Filtering price:', price, this.activeFilters.priceRange);
        switch (this.activeFilters.priceRange) {
          case 'free': return price === 0;
          case 'under10': return price < 10;
          case 'under20': return price < 20;
          case 'under30': return price < 30;
          case 'under60': return price < 60;
          default: return true;
        }
      });
    }

    // Apply features filter
    if (this.activeFilters.features) {
      filtered = filtered.filter(game => {
        console.log('Filtering features:', game.features, this.activeFilters.features);
        return game.features && game.features.includes(this.activeFilters.features);
      });
    }

    // Apply sorting
    console.log('Sorting by:', this.activeFilters.sortBy);
    switch (this.activeFilters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'release':
        filtered.sort((a, b) => {
          const dateA = new Date(a.releaseDate || 0).getTime();
          const dateB = new Date(b.releaseDate || 0).getTime();
          return dateB - dateA;
        });
        break;
      case 'relevance':
        filtered.sort((a, b) => {
          const ratingDiff = (b.rating || 0) - (a.rating || 0);
          if (ratingDiff !== 0) return ratingDiff;
          const dateA = new Date(a.releaseDate || 0).getTime();
          const dateB = new Date(b.releaseDate || 0).getTime();
          return dateB - dateA;
        });
        break;
    }

    console.log('Filtered games:', filtered); // Debug log
    return filtered;
  }

  ngOnInit() {
    this.gameService.getAllGames().subscribe({
      next: (games) => {
        console.log('Received games from API:', games);
        this.games = games;
      },
      error: (error) => console.error('Error fetching games:', error)
    });
  }

  onFilterChange() {
    console.log('Filter changed:', this.activeFilters); // Debug log
  }
}