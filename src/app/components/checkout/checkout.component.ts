import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-steam-dark py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Checkout Header -->
          <h1 class="text-3xl font-bold text-steam-text mb-8">Checkout</h1>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Summary (Left Side) -->
            <div class="lg:col-span-2">
              <div class="bg-steam-light rounded-lg p-6 mb-6">
                <h2 class="text-xl font-bold text-steam-text mb-4">Order Summary</h2>
                
                <!-- Cart Items -->
                <div class="space-y-4">
                  <div *ngFor="let item of cartItems" 
                       class="flex items-center space-x-4 bg-steam-dark p-4 rounded-lg">
                    <img [src]="item.imageUrl" 
                         [alt]="item.title"
                         class="w-20 h-20 object-cover rounded-md">
                    <div class="flex-1">
                      <h3 class="text-steam-text font-medium">{{ item.title }}</h3>
                      <div class="flex items-center justify-between mt-2">
                        <span class="text-steam-blue">{{ item.price | currency }}</span>
                        <div class="flex items-center space-x-3">
                          <button (click)="updateQuantity(item.id, item.quantity - 1)"
                                  class="text-steam-text hover:text-steam-blue px-2 py-1">-</button>
                          <span class="text-steam-text">{{ item.quantity }}</span>
                          <button (click)="updateQuantity(item.id, item.quantity + 1)"
                                  class="text-steam-text hover:text-steam-blue px-2 py-1">+</button>
                          <button (click)="removeItem(item.id)"
                                  class="ml-4 text-red-500 hover:text-red-400">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Empty Cart Message -->
                <div *ngIf="cartItems.length === 0" 
                     class="text-center py-8 text-steam-text">
                  Your cart is empty. 
                  <a routerLink="/games" 
                     class="text-steam-blue hover:text-steam-blue-light ml-2">
                    Browse games
                  </a>
                </div>
              </div>
            </div>

            <!-- Payment Summary (Right Side) -->
            <div class="lg:col-span-1">
              <div class="bg-steam-light rounded-lg p-6 sticky top-6">
                <h2 class="text-xl font-bold text-steam-text mb-4">Payment Summary</h2>
                
                <!-- Price Breakdown -->
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-steam-text">
                    <span>Subtotal</span>
                    <span>{{ subtotal | currency }}</span>
                  </div>
                  <div class="flex justify-between text-steam-text">
                    <span>Tax</span>
                    <span>{{ tax | currency }}</span>
                  </div>
                  <div *ngIf="discount > 0" class="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-{{ discount | currency }}</span>
                  </div>
                  <div class="pt-3 border-t border-steam-border">
                    <div class="flex justify-between text-steam-text font-bold">
                      <span>Total</span>
                      <span>{{ total | currency }}</span>
                    </div>
                  </div>
                </div>

                                <!-- Enhanced Payment Method Selection -->
                <div class="mb-6">
                  <h3 class="text-steam-text font-medium mb-3">Payment Method</h3>
                  <div class="space-y-2">
                    <label *ngFor="let method of paymentMethods" 
                           class="flex items-center space-x-3 p-3 bg-steam-dark rounded-lg cursor-pointer hover:bg-opacity-80
                                  transition-colors duration-200"
                           [class.border-steam-blue]="selectedPaymentMethod === method.id"
                           [class.border]="selectedPaymentMethod === method.id">
                      <input type="radio" 
                             [value]="method.id" 
                             [(ngModel)]="selectedPaymentMethod"
                             name="paymentMethod"
                             class="text-steam-blue">
                      <div class="flex items-center space-x-3">
                        <img [src]="method.icon" [alt]="method.name" class="h-6 w-auto">
                        <span class="text-steam-text">{{ method.name }}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Payment Details (Credit Card) -->
                <div *ngIf="selectedPaymentMethod === 'credit'" class="mb-6 space-y-4">
                  <div>
                    <label class="block text-steam-text text-sm font-medium mb-2">Card Number</label>
                    <input type="text" 
                           [(ngModel)]="cardDetails.number"
                           placeholder="1234 5678 9012 3456"
                           class="w-full px-3 py-2 bg-steam-dark text-steam-text rounded-lg 
                                  focus:outline-none focus:ring-2 focus:ring-steam-blue"
                           (input)="formatCardNumber($event)"
                           maxlength="19">
                  </div>
                  <div>
                    <label class="block text-steam-text text-sm font-medium mb-2">Cardholder Name</label>
                    <input type="text" 
                           [(ngModel)]="cardDetails.name"
                           placeholder="John Doe"
                           class="w-full px-3 py-2 bg-steam-dark text-steam-text rounded-lg 
                                  focus:outline-none focus:ring-2 focus:ring-steam-blue">
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-steam-text text-sm font-medium mb-2">Expiry Date</label>
                      <input type="text" 
                             [(ngModel)]="cardDetails.expiry"
                             placeholder="MM/YY"
                             class="w-full px-3 py-2 bg-steam-dark text-steam-text rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-steam-blue"
                             (input)="formatExpiry($event)"
                             maxlength="5">
                    </div>
                    <div>
                      <label class="block text-steam-text text-sm font-medium mb-2">CVV</label>
                      <input type="text" 
                             [(ngModel)]="cardDetails.cvv"
                             placeholder="123"
                             class="w-full px-3 py-2 bg-steam-dark text-steam-text rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-steam-blue"
                             maxlength="3">
                    </div>
                  </div>
                </div>

                <!-- PayPal Section -->
                <div *ngIf="selectedPaymentMethod === 'paypal'" class="mb-6">
                  <div class="bg-steam-dark p-4 rounded-lg text-steam-text text-center">
                    <img src="assets/game-images/payment-icons/paypal.png" alt="PayPal" class="h-12 mx-auto mb-3">
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                </div>

                <!-- Promo Code -->
                <div class="mb-6">
                  <div class="flex space-x-2">
                    <input type="text" 
                           [(ngModel)]="promoCode"
                           placeholder="Enter promo code" 
                           class="flex-1 px-3 py-2 bg-steam-dark text-steam-text rounded-lg focus:outline-none focus:ring-2 focus:ring-steam-blue">
                    <button (click)="applyPromoCode()"
                            class="px-4 py-2 bg-steam-blue text-white rounded-lg hover:bg-opacity-90">
                      Apply
                    </button>
                  </div>
                </div>

                <!-- Checkout Button -->
                <button (click)="processCheckout()"
                        [disabled]="cartItems.length === 0 || !selectedPaymentMethod"
                        class="w-full py-3 bg-steam-blue text-white rounded-lg font-medium
                               hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  selectedPaymentMethod: string = '';
  promoCode: string = '';
  discount: number = 0;
  userEmail: string = '';

  cardDetails = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  paymentMethods = [
    { 
      id: 'credit', 
      name: 'Credit Card',
      icon: 'assets/game-images/payment-icons/credit-card.png'
    },
    { 
      id: 'paypal', 
      name: 'PayPal',
      icon: 'assets/game-images/payment-icons/paypal.png'
    }
  ];

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      this.cardDetails.number = parts.join(' ');
      event.target.value = parts.join(' ');
    } else {
      this.cardDetails.number = value;
      event.target.value = value;
    }
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    if (value.length >= 2) {
      const month = value.substring(0, 2);
      const year = value.substring(2);
      this.cardDetails.expiry = `${month}/${year}`;
      event.target.value = `${month}/${year}`;
    } else {
      this.cardDetails.expiry = value;
      event.target.value = value;
    }
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe(user => {
      this.userEmail = user?.email || '';
    });
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.1; // 10% tax
  }

  get total(): number {
    return this.subtotal + this.tax - this.discount;
  }

  updateQuantity(itemId: string, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(itemId, quantity);
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  applyPromoCode() {
    // Example promo code logic
    if (this.promoCode.toLowerCase() === 'dteam10') {
      this.discount = this.subtotal * 0.1; // 10% discount
    } else {
      this.discount = 0;
    }
  }

  processCheckout() {
    if (this.cartItems.length === 0 || !this.selectedPaymentMethod) {
      return;
    }

    if (this.selectedPaymentMethod === 'credit' && !this.validateCreditCard()) {
      console.error('Invalid credit card details');
      return;
    }

    const orderData = {
      items: this.cartItems,
      total: this.total,
      paymentMethod: this.selectedPaymentMethod,
      paymentDetails: this.selectedPaymentMethod === 'credit' ? this.cardDetails : {},
      email: this.userEmail,
      status: 'pending'
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order created:', response);
        this.cartService.clearCart();
        this.router.navigate(['/checkout/success']);
      },
      error: (error) => {
        console.error('Error creating order:', error);
        // Handle error (show error message to user)
      }
    });

    console.log('Processing checkout...', {
      items: this.cartItems,
      paymentMethod: this.selectedPaymentMethod,
      paymentDetails: this.selectedPaymentMethod === 'credit' ? this.cardDetails : {},
      total: this.total
    });

    // Simulate processing
    setTimeout(() => {
      this.cartService.clearCart();
      this.router.navigate(['/checkout/success']);
    }, 1500);
  }

  validateCreditCard(): boolean {
    return (
      this.cardDetails.number.replace(/\s/g, '').length === 16 &&
      this.cardDetails.name.length > 0 &&
      this.cardDetails.expiry.length === 5 &&
      this.cardDetails.cvv.length === 3
    );
  }
}