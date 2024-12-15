import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router'; // Add RouterLink import
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Add RouterLink to imports
  template: `
    <div class="min-h-screen bg-steam-dark py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto bg-steam-light p-8 rounded-lg shadow-xl">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-steam-text">Create Account</h2>
          <p class="mt-2 text-sm text-steam-text opacity-80">Join the Dteam gaming community</p>
        </div>

        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-steam-text">
              Username
            </label>
            <div class="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                [(ngModel)]="username"
                required
                class="w-full px-3 py-2 border border-steam-border rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-steam-blue focus:border-steam-blue
                       bg-steam-dark text-steam-text"
                placeholder="Enter your username"
              >
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-steam-text">
              Email Address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                [(ngModel)]="email"
                required
                class="w-full px-3 py-2 border border-steam-border rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-steam-blue focus:border-steam-blue
                       bg-steam-dark text-steam-text"
                placeholder="Enter your email"
              >
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-steam-text">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                [(ngModel)]="password"
                required
                class="w-full px-3 py-2 border border-steam-border rounded-md shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-steam-blue focus:border-steam-blue
                       bg-steam-dark text-steam-text"
                placeholder="Create a password"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              [disabled]="!registerForm.form.valid"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                     shadow-sm text-sm font-medium text-white bg-steam-blue hover:bg-steam-blue-dark 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-steam-blue
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors duration-200"
            >
              Create Account
            </button>
          </div>

          <!-- Login Link -->
          <div class="text-center mt-4">
            <p class="text-sm text-steam-text">
              Already have an account?
              <a routerLink="/login" class="text-steam-blue hover:text-steam-blue-light font-medium cursor-pointer">
                Sign in
              </a>
            </p>
          </div>
        </form>

        <!-- Error Message -->
        <div *ngIf="errorMessage" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post(environment.apiUrl+'/auth/register', userData)
      .subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);
          // Store the token if provided
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          // Navigate to login page after successful registration
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        }
      });
  }
}