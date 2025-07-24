import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { IBasket } from 'src/app/interface/Basket/IBasket';
import { IProductInBasket } from 'src/app/interface/Basket/IProductInBasket';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../AuthService/auth.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartServiceService {
  private baseUrl: string = environment.apiUrl;
  private cartCount = new BehaviorSubject<number>(this.getInitialCount());
  cartCount$ = this.cartCount.asObservable();
  
 
  constructor(private http: HttpClient) {
         
  }

  private getInitialCount(): number {
    const savedCount = localStorage.getItem('cartCount');
    return savedCount ? parseInt(savedCount) : 0;
  }

  GetAllProductInBasket(): Observable<IBasket> {
    return this.http.get<IBasket>(this.baseUrl + '/api/Basket');
  }
  
 
  AddProductInBasket(create: {
    productid: number;
  }): Observable<IProductInBasket> {
    return this.http.post<IProductInBasket>(
      this.baseUrl + '/api/Basket',
      create
    ).pipe(tap(()=>{
      const currentCount = this.cartCount.getValue();
      this.cartCount.next(currentCount +1);
      localStorage.setItem('cartCount', (currentCount+1).toString())
    }),
    catchError((err)=>{

      return throwError(() => err);
    })
  );
  }
  CountDelete(value:number){
    let currentCount = this.cartCount.getValue();
    this.cartCount.next(currentCount -value);
    localStorage.setItem('cartCount', (currentCount-value).toString())
  }
  DeleteProductInBasket(id: number): Observable<string> {
    return this.http.delete<string>(this.baseUrl + '/api/Basket/' + id);
  }

  IncreaseQuantity(id: number): Observable<IProductInBasket> {
    return this.http.put<IProductInBasket>(
      this.baseUrl + '/api/Basket/increase/' + id,
      {}
    ).pipe(tap(()=>{
      const currentCount = this.cartCount.getValue();
      this.cartCount.next(currentCount +1);
      localStorage.setItem('cartCount', (currentCount+1).toString())
    }),
    catchError((err)=>{
      return throwError(() => err);
    })
  );
  }
  
  DecreaseQuantity(id: number): Observable<IProductInBasket> {
    return this.http.put<IProductInBasket>(
      this.baseUrl + '/api/Basket/decrease/' + id,
      {}
    ).pipe(tap(()=>{
      const currentCount = this.cartCount.getValue();
      this.cartCount.next(currentCount -1);
      localStorage.setItem('cartCount', (currentCount-1).toString())
    }),
    catchError((err)=>{
      return throwError(() => err);
    })
  );
  }
   
   
}


