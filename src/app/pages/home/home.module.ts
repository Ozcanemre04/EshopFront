import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchComponent } from 'src/app/components/Home/search/search.component';
import { SortComponent } from 'src/app/components/Home/sort/sort.component';
import { ProductsComponent } from 'src/app/components/Home/products/products.component';
import { CategoryComponent } from 'src/app/components/Home/category/category.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AddToBasketComponent } from 'src/app/shared/components/add-to-basket/add-to-basket.component';
import { RatingsComponent } from 'src/app/shared/components/ratings/ratings.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    SortComponent,
    ProductsComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    AddToBasketComponent,
    NgOptimizedImage,
    RatingsComponent,
    MatSnackBarModule
  ]
})
export class HomeModule { }
