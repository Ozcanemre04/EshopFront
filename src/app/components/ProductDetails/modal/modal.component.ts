import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IReview } from 'src/app/interface/Reviews/IReview';
import { IReviewUpdate } from 'src/app/interface/Reviews/IReviewUpdate';
import { ReviewsServiceService } from 'src/app/services/ReviewsService/reviews-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit,OnDestroy {
  reviewId:number=0
  productidRoute:number=0;
  reviewUpdate:IReviewUpdate= {} as IReviewUpdate
  private destroy$ = new Subject<void>();
  starSubject= new BehaviorSubject<{num:number,checked:boolean}[]>([
    {num:1,checked:false},{num:2,checked:false},{num:3,checked:false},{num:4,checked:false},{num:5,checked:false}]);
  reviews$:Observable<IReview[]>=of();

  constructor(@Inject(MAT_DIALOG_DATA) public data: {review: string, star: number,reviewId:number,productId:number},
  private reviewService:ReviewsServiceService,public dialogRef: MatDialogRef<ModalComponent>) {
    this.reviewId=data.reviewId
    this.reviewUpdate.reviews=data.review
    this.reviewUpdate.stars=data.star,
    this.productidRoute=data.productId
   }

  ngOnInit(): void {
    var currentstar = this.starSubject.getValue();
    var newstarvalue=currentstar.map(x=>{
     if(x.num<=this.reviewUpdate.stars){
      return {...x,checked:true}
     }
     return x
    })
    this.starSubject.next(newstarvalue)
  }

  updateParent(): void {
     this.dialogRef.close({ reviews: "ddsds"});
  }

getStarValue(star:number){
   this.reviewUpdate.stars=star;
}


UpdateReview(){ 
      this.reviewService.UpdateReview(this.reviewId,this.reviewUpdate)
      .pipe(switchMap(()=>this.reviewService.GetAllReviews(this.productidRoute)),takeUntil(this.destroy$))
      .subscribe({
        next:(value)=> {
            this.dialogRef.close({ reviews: value}); 
        },
        error:(err)=> {
          console.log(err)
        }
      })
    }
     ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
}
