import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CartService,
    AuthService,
    ToastService
  ]
};