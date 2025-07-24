import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from 'src/app/interface/Product/IProduct';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ShoppingCartServiceService } from 'src/app/services/ShoppingCartService/shopping-cart-service.service';

@Component({
  selector: 'app-add-to-basket',
  templateUrl: './add-to-basket.component.html',
  styleUrls: ['./add-to-basket.component.scss'],
  standalone:true
})
export class AddToBasketComponent implements OnInit,OnDestroy {
connected:boolean = false;
constructor(private cartService:ShoppingCartServiceService,private authService:AuthService,private snackbar:MatSnackBar){}
private destroy$= new Subject<void>()
ngOnInit(): void {
  this.authService.connected.pipe(takeUntil(this.destroy$)).subscribe({
    next:(v)=>{
      this.connected=v;
    }
  })
}
@Input()
product:IProduct={} as IProduct;


addToBasket(create:{productid:number}){  
  if(this.connected){
    this.cartService.AddProductInBasket(create).pipe(takeUntil(this.destroy$)).subscribe();
    this.snackbar.open("Product Added,check your basket ","",{
      duration:2000,
      horizontalPosition:'end'
    })
  }
  else{
    this.snackbar.open("","Unauthorized,pls login",{
      duration:2000,
      horizontalPosition:'end',
    })
    
  }
}
ngOnDestroy(): void {
   this.destroy$.next()
   this.destroy$.complete()
}
}
