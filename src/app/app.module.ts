import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { HeaderComponent } from './shared/components/header/header.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { SuccessComponent } from './pages/success/success.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SuccessComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor,
    multi:true
  },provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }