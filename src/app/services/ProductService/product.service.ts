import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { IPaginatedProduct } from 'src/app/interface/Product/IPaginatedProduct';
import { IProduct } from 'src/app/interface/Product/IProduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl:string = environment.apiUrl;
  constructor(private http:HttpClient) { }

  GetAllProducts(pageNumber:number,pageSize:number,category:string,search:string,order_type:string,asc:boolean):Observable<IPaginatedProduct>{
    return this.http.get<IPaginatedProduct>(this.baseUrl+
      '/api/Product?pageNumber='+pageNumber+'&pageSize='+pageSize+'&category='+category+'&search='+search+'&order_type='+order_type+'&asc='+asc);
   }
  GetProduct(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(this.baseUrl+'/api/Product/'+id)
   }
  
}
