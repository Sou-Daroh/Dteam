import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games', component: GameListComponent, }, 
  { path: 'game/:id', component: GameDetailComponent,  }, 
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }, 
  { path: 'checkout/success', component: CheckoutSuccessComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    component: SearchComponent
  }
];