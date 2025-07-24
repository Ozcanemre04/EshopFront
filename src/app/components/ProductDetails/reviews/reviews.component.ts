import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject,Observable, of, Subject, switchMap, take, takeLast, takeUntil} from 'rxjs';
import { IReview } from 'src/app/interface/Reviews/IReview';
import { IReviewCreate} from 'src/app/interface/Reviews/IReviewCreate';
import { ReviewsServiceService } from 'src/app/services/ReviewsService/reviews-service.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit,OnDestroy {
  productidRoute:number=Number(this.route.snapshot.paramMap.get('productId'));
  reviews$:Observable<IReview[]>;
  private destroy$ = new Subject<void>();
  token:string|null="";
  decodedToken:any;
  userid:string="";
  starSubject= new BehaviorSubject<{num:number,checked:boolean}[]>([
    {num:1,checked:false},{num:2,checked:false},{num:3,checked:false},{num:4,checked:false},{num:5,checked:false}]);
  star$=this.starSubject.asObservable();
  reviewCreate:IReviewCreate={reviews:"",stars:0,productId:this.productidRoute};


  constructor(private reviewService:ReviewsServiceService,private route:ActivatedRoute,private dialog:MatDialog,private snackbar:MatSnackBar){
    this.productidRoute = Number(this.route.snapshot.paramMap.get('productId'));
    this.reviews$= this.reviewService.GetAllReviews(this.productidRoute);
  }
 

  trackReview(index:number,item:IReview){
      return item.id
    }
  getcurrentUserid(){
    this.token = localStorage.getItem("ACCESS_TOKEN")
    if(this.token){
      this.decodedToken = jwtDecode(this.token);
      this.userid = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];  
    }
  }
 
  ngOnInit(): void {
    this.getcurrentUserid()
  }
  
    deleteReview(id:number){
      this.reviewService.DeleteReview(id).pipe(switchMap(()=>this.reviewService.GetAllReviews(this.productidRoute)),
      takeUntil(this.destroy$)).subscribe({
        next:(value)=>{
          this.reviews$=of(value);
          const currentStar = this.starSubject.getValue();
          const updatedStar= currentStar.map(star=>{return {...star,checked:false}})
          this.starSubject.next(updatedStar)
          this.snackbar.open("review deleted","",{
          duration:2000,
           horizontalPosition:'end',
            })
    
        },
        error(err) {
          console.log(err);
          
        },
      })
    }

      getStarValue(star:number){
       this.reviewCreate.stars=star;
    }
    submitReviews(){
      this.reviewService.AddReview({reviews:this.reviewCreate.reviews,stars:this.reviewCreate.stars,productId:this.reviewCreate.productId})
      .pipe(switchMap(()=>this.reviewService.GetAllReviews(this.productidRoute)),takeUntil(this.destroy$))
      .subscribe({
        next:(value)=> {
           this.reviews$= of(value)
           this.snackbar.open("review added","",{
          duration:2000,
           horizontalPosition:'end',
            })
            this.reviewCreate={reviews:"",stars:0,productId:this.productidRoute};
            var currentStar = this.starSubject.getValue()
            this.starSubject.next(currentStar.map(x=>{
             return{...x,checked:false}
            }));
        },
        error:(err)=> {
          console.log(err);
          
          this.snackbar.open("",err,{
          duration:2000,
           horizontalPosition:'end',
            })
        }
      })
    }
    

   openDialog(review:string,star:number,reviewId:number){
      const dialogRef = this.dialog.open(ModalComponent, {
      width: '450px',
      height:'350px',
      data: {review: review, star: star,reviewId:reviewId,star$:this.star$,starSubject:this.starSubject,reviews$:this.reviews$,productId:this.productidRoute}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if(result){
        this.reviews$=of(result.reviews) 

      }
    });
  }
     
    ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
    }
}
