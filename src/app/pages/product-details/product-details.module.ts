import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddToBasketComponent } from 'src/app/shared/components/add-to-basket/add-to-basket.component';
import { RatingsComponent } from 'src/app/shared/components/ratings/ratings.component';
import { FormRatingsComponent } from 'src/app/shared/components/form-ratings/form-ratings.component';
import { ReviewsComponent } from 'src/app/components/ProductDetails/reviews/reviews.component';
import { ProductComponent } from 'src/app/components/ProductDetails/product/product.component';
import { ModalComponent } from 'src/app/components/ProductDetails/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    ProductDetailsComponent,
    FormRatingsComponent,
    ReviewsComponent,
    ProductComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    MatIconModule,
    FormsModule,
    AddToBasketComponent,
    RatingsComponent,
    NgOptimizedImage,
    MatDialogModule,
    MatSnackBarModule,
    NgOptimizedImage
  ]
})
export class ProductDetailsModule { }
