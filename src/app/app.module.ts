import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameListComponent,
    GameDetailComponent,
    ShoppingCartComponent,
    HeaderComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    CheckoutComponent,
    ShoppingCartComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
