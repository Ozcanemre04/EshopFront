import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interface/Category/ICategory';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
  
  GetCategory():Observable<ICategory[]>{
     return this.http.get<ICategory[]>(environment.apiUrl+'/api/Category');
    }
}
