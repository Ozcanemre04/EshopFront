import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from 'src/app/interface/Product/IProduct';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
  standalone:true,
  imports:[ CommonModule,MatIconModule]
})
export class RatingsComponent {
  star:number[]=[1,2,3,4,5];
  @Input()
  productRatings:number = 0;
  constructor(){}
  
 checked(p:number):number{
    if(p % 1 > 0.7){
      return Math.ceil(p)
    }
    else if(p % 1 < 0.3){
      return Math.floor(p)
    }
   else {
    return Math.ceil(p);
   }
  }
  getstarIcon(rating:number,s:number){
    const firstdigist = Math.ceil(rating);
    const hasHalfStar = (rating % 1) >= 0.3 && (rating % 1) <= 0.7 ;

    if(hasHalfStar && firstdigist!=s){
      return "star";
    }
    else if(hasHalfStar && firstdigist==s){
      return "star_half";
    }
    else  {
      return "star";
    }
  }
}
