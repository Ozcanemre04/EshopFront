import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReview } from 'src/app/interface/Reviews/IReview';
import { IReviewCreate } from 'src/app/interface/Reviews/IReviewCreate';
import { IReviewUpdate } from 'src/app/interface/Reviews/IReviewUpdate';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewsServiceService {

   private baseUrl:string = environment.apiUrl;
    constructor(private http:HttpClient) { 
    }
  
    GetAllReviews(id:number):Observable<IReview[]>{
      return this.http.get<IReview[]>(this.baseUrl+"/api/Review/"+id);
     }
    AddReview(create:IReviewCreate):Observable<IReview>{
      return this.http.post<IReview>(this.baseUrl+'/api/Review',create)
     }
    DeleteReview(id:number):Observable<IReview>{
      return this.http.delete<IReview>(this.baseUrl+'/api/Review/'+id)
     }
    UpdateReview(id:number,update:IReviewUpdate):Observable<IReview>{
      return this.http.put<IReview>(this.baseUrl+'/api/Review/'+id,update)
     }
}
