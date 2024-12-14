import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

export interface Game {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  genres: string[];
  rating: number;
  features: string[];
  releaseDate: string | Date;
  discount?: number;
  originalPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = `${environment.apiUrl}/games`;

  constructor(private http: HttpClient) {}

  getFeaturedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/featured`).pipe(
      tap(games => console.log('Fetched featured games:', games)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}\nMessage: ${error.error?.message || error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      tap(games => console.log('Fetched all games:', games)),
      catchError(this.handleError)
    );
  }

  searchGames(query: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/search`, {
      params: { q: query }
    });
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`).pipe(
      tap(game => console.log('Fetched game:', game)),
      catchError(this.handleError)
    );
  }
}