import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-steam-dark py-8">
      <div class="container mx-auto px-4">
        <div class="mb-6">
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            (keyup.enter)="search()"
            placeholder="Search games..."
            class="w-full p-3 bg-steam-light text-white rounded-lg"
          >
        </div>

        @if (loading) {
          <div class="text-center text-white">Loading...</div>
        } @else if (error) {
          <div class="text-center text-red-500">{{ error }}</div>
        } @else if (searchResults.length) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (game of searchResults; track game._id) {
              <a [routerLink]="['/game', game._id]" 
                 class="bg-steam-light rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
                <img [src]="game.imageUrl" [alt]="game.title" class="w-full h-48 object-cover">
                <div class="p-4">
                  <h3 class="text-white text-lg font-semibold mb-2">{{game.title}}</h3>
                  <p class="text-steam-blue font-bold">{{game.price | currency}}</p>
                </div>
              </a>
            }
          </div>
        } @else {
          <div class="text-center text-steam-text">No results found</div>
        }
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: Game[] = [];
  loading = false;
  error: string | null = null;

  constructor(private gameService: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.search();
      }
    });
  }

  search(): void {
    if (!this.searchQuery.trim()) return;

    this.loading = true;
    this.error = null;

    this.gameService.searchGames(this.searchQuery)
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.error = 'Failed to search games';
          this.loading = false;
        }
      });
  }
}