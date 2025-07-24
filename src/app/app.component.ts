import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './services/ProductService/product.service';
import { BehaviorSubject, concatMap, delay, from, interval, map, mergeMap, of, Subject, switchMap } from 'rxjs';
import { AuthService } from './services/AuthService/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'EshopFront';
  constructor() {}

 
  
}
