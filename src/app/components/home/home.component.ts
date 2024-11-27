import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 class="text-5xl font-bold mb-4 text-steam-text">Welcome to Dteam</h1>
      <a routerLink="/games" class="btn text-lg py-3 px-6">Browse Games</a>
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
export class HomeComponent {}