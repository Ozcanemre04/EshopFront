import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, every, filter, lastValueFrom, map, Observable, pipe, reduce, Subject, take, takeUntil, tap } from 'rxjs';
import { IProductInBasket } from 'src/app/interface/Basket/IProductInBasket';
import { CheckoutService } from 'src/app/services/Checkout/checkout.service';
import {  ShoppingCartServiceService } from 'src/app/services/ShoppingCartService/shopping-cart-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit ,OnDestroy{
products$:Observable<IProductInBasket[]>=this.cartService.GetAllProductInBasket()
        .pipe(map(basket=>basket.basketProductDtoResponses))
constructor(private cartService:ShoppingCartServiceService,private checkoutService:CheckoutService){}
totalPrice=new BehaviorSubject<any>(0)
totalPrice$= this.totalPrice.asObservable()
private destroy$ = new Subject<void>(); 


ngOnInit(): void {
  this.products$.pipe(takeUntil(this.destroy$)).subscribe({
    next:(value)=> {
      if(value.length>0){
        this.totalPrice.next(value.map(x=>x.totalPrice).reduce((x,y)=>x+y).toFixed(2));
      }

    },
  })
  
}
  increaseQuantity(product:IProductInBasket){
    this.cartService.IncreaseQuantity(product.id).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next:(value)=> {
          console.log(value);
          
          product.quantity=value.quantity;
          product.totalPrice=value.totalPrice;
          var currentPrice = this.totalPrice.getValue()
          this.totalPrice.next((Number(currentPrice)+Number(value.price)).toFixed(2)) 
        },
        error(err) {
          console.log(err);
          
        },
      }
    )
  }
  decreaseQuantity(product:IProductInBasket){
    this.cartService.DecreaseQuantity(product.id).pipe(takeUntil(this.destroy$)).subscribe(
      {
        next:(value)=> {
          var currentPrice = this.totalPrice.getValue()
          if(product.quantity>1){
            product.quantity=value.quantity;
            product.totalPrice=value.totalPrice; 
            this.totalPrice.next((Number(currentPrice)-Number(value.price)).toFixed(2)) 
          }
          else{
             this.totalPrice.next((Number(currentPrice)-Number(value.price)).toFixed(2)) 
             this.products$ = this.products$.pipe(map(x=>x.filter(x=>x.id!==product.id)))  
          }
        },
        error(err) {
          console.log(err);
        },
      }
    )
  }
  removeProduct(product:IProductInBasket){ 
     this.cartService.DeleteProductInBasket(product.id).pipe(tap(()=>{
             this.products$ = this.products$.pipe(map(x=>x.filter(x=>x.id!==product.id)));
             this.cartService.CountDelete(product.quantity);
             var currentPrice = this.totalPrice.getValue()
             this.totalPrice.next((currentPrice-product.totalPrice).toFixed(2)) 
     }),takeUntil(this.destroy$))
     .subscribe(
      {
       
        error(err) {
          console.log(err);
          
        },
      }
    )
  }

  async payNow(): Promise<void> {
   const products = await lastValueFrom(this.products$.pipe(take(1)));
   if (!products || products.length === 0) return;
    this.checkoutService.createCheckoutSession(products).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        console.log('Checkout initiated');
      },
      error: (error) => {
        console.log(error);
        
        console.error('Checkout failed:', error);
        alert('Failed to initiate checkout. Please try again.');
      }
    });
  }
  trackCart(index:number,item:IProductInBasket){
    return item.id
  }
 

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
