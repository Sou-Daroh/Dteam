import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  // Get the current cart
  getCart() {
    return this.cartSubject.asObservable();
  }

  // Add item to the cart
  addToCart(item: CartItem) {
    const currentCart = this.cartSubject.value;
    const existingItemIndex = currentCart.findIndex(i => i.title === item.title);
    
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += item.quantity;
    } else {
      currentCart.push(item);
    }

    this.cartSubject.next(currentCart);
  }

  // Clear the cart
  clearCart() {
    this.cartSubject.next([]);
  }
}
