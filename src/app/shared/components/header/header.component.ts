import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/services/AuthService/auth.service';
import { ShoppingCartServiceService } from 'src/app/services/ShoppingCartService/shopping-cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

connected:boolean = false;
constructor(private authService:AuthService,private router:Router,private cartService:ShoppingCartServiceService){
}
count$:Observable<number> = this.cartService.cartCount$

  ngOnInit(): void {
    this.authService.connected.subscribe({
      next:(v)=>{
      this.connected=v;
    }
    })

    
  }

Onlogout(){
  this.authService.logout()
  this.router.navigate(['/','login'])
}
}
