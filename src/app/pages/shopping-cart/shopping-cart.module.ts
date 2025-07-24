import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { MatIconModule } from '@angular/material/icon';




@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    MatIconModule,
    NgOptimizedImage
  ]
})
export class ShoppingCartModule { }
