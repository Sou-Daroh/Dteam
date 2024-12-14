import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from './cart.service';
import { Observable } from 'rxjs';

export interface Order {
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  paymentDetails?: any;
  status: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(this.apiUrl, orderData, { headers });
  }
}