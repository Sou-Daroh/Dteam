import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private savedItems: CartItem[] = [];

  constructor() {
    // Load cart from localStorage on service initialization
    this.loadCart();
  }

  // Get cart as observable
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Get cart total
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Add item to cart
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    
    this.updateCart();
  }

  // Remove item from cart
  removeFromCart(itemId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.updateCart();
  }

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeFromCart(itemId);
      } else {
        this.updateCart();
      }
    }
  }

  // Save item for later
  saveForLater(itemId: string): void {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      this.savedItems.push(item);
      this.removeFromCart(itemId);
      localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
    }
  }

  // Get saved items
  getSavedItems(): CartItem[] {
    return this.savedItems;
  }

  // Move to cart from saved items
  moveToCart(itemId: string): void {
    const item = this.savedItems.find(i => i.id === itemId);
    if (item) {
      this.addToCart(item);
      this.savedItems = this.savedItems.filter(i => i.id !== itemId);
      localStorage.setItem('savedItems', JSON.stringify(this.savedItems));
    }
  }

  // Clear cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  // Private helper methods
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('cartItems');
    const savedItemsList = localStorage.getItem('savedItems');
    
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next([...this.cartItems]);
    }
    
    if (savedItemsList) {
      this.savedItems = JSON.parse(savedItemsList);
    }
  }
}