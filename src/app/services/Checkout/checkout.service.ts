import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Observable, switchMap } from 'rxjs';
import { IProductInBasket } from 'src/app/interface/Basket/IProductInBasket';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
   private baseUrl: string = environment.apiUrl;
  private stripe: Stripe | null = null;
  private async initStripe() {
      if(!this.stripe){
        this.stripe = await loadStripe(environment.publishableKey);
      }
      return this.stripe;
    }
  constructor(private http: HttpClient) {
    this.initStripe(); 
   }

   createCheckoutSession(items: IProductInBasket[]): Observable<void> {
    return this.http.post<{ sessionId: string; }>(this.baseUrl+'/create-checkout-session',
      items
    ).pipe(
      switchMap(async response => {
        const stripe = await this.stripe;
        if (!stripe) {
          throw new Error('Stripe failed to initialize');
        }
        console.log(response);
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: response.sessionId 
        });

        if (error) {
          throw new Error(error.message);
        }
      })
    );
  }
}
