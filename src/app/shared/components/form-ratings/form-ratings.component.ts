import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-ratings',
  templateUrl: './form-ratings.component.html',
  styleUrls: ['./form-ratings.component.scss']
})
export class FormRatingsComponent implements OnChanges {
@Input()
starSubject!:BehaviorSubject<{num:number,checked:boolean}[]>;
star$!:Observable<{num: number, checked: boolean}[]> 
private destroy$ = new Subject<void>();

ngOnChanges(changes: SimpleChanges): void {
    this.star$ = this.starSubject.asObservable();
  }

   selectStar(selectedStar:{num:number,checked:boolean}){
    var oldStar = this.starSubject.getValue()
    if(selectedStar.checked===false){
      const updatedStars = oldStar.map(star => {
        if (star.num <= selectedStar.num) {
          return { ...star, checked: true }; 
        }
        return star});
      this.starSubject.next(updatedStars)
    }
    else{
      const updatedStars = oldStar.map(
        star=>{ 
          if(star.num>selectedStar.num){
            return { ...star, checked: false }
          }
          return star})
      this.starSubject.next(updatedStars)
    }
    this.getStarValue()
    }

   @Output() 
   starValueEmitter: EventEmitter<number> = new EventEmitter();

    private getStarValue(){
      this.star$.pipe(map((x)=>x.filter(y=>y.checked===true)),take(1),takeUntil(this.destroy$)).subscribe({
        next:(starValue)=> {
          this.starValueEmitter.emit(starValue.length)
        },
      })
      
    }
 ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
}
