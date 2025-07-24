import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SuccessComponent } from './pages/success/success.component';

const routes: Routes = [
  { path: 'success', component: SuccessComponent },
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'Auth', loadChildren: () => import('./pages/Auth/auth.module').then(m => m.AuthModule) },
  { path: 'product-details/:productId', loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule) },
  { path: 'shopping-cart', loadChildren: () => import('./pages/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),canActivate:[authGuard] },

  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
