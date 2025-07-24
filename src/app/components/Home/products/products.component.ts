import {  Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IPaginatedProduct } from 'src/app/interface/Product/IPaginatedProduct';
import { IProduct } from 'src/app/interface/Product/IProduct';
import { ProductService } from 'src/app/services/ProductService/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnChanges,OnDestroy {
  products:IProduct[]=[];
  private product_subscription!:Subscription;
  currentpage:number=0;
  pageSize:number=20;
  pageSizeOptions = [5, 10,15,20];
  @Input()
  category:string="All";
  @Input()
  search:string="";
  @Input()
  sort:{id:number,name:string,asc:boolean}={id:1,name:"Default ↓",asc:true};
  totalRecords:number=20;
  
 constructor(private productService:ProductService){}
  ngOnDestroy(): void {
    this.product_subscription.unsubscribe()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['category']||changes['search']||changes['sort']){
      this.currentpage=0;
      this.getAllProduct();
    }
  }

  trackProdcuts(index:number,item:IProduct){
      return item.id
    }
 
 getAllProduct(){
  this.product_subscription=this.productService.GetAllProducts(this.currentpage,this.pageSize,this.category,this.search,this.sort.name.split(" ")[0],this.sort.asc) 
  .subscribe({
    next:(product:IPaginatedProduct)=> {
      this.products = product.data;
      this.totalRecords = product.totalRecords
      this.currentpage = product.pageNumber;
    },
    error:(err)=> {
      console.log(err);
      
    },
  })
 }

 onPageChange(event: PageEvent): void {
    this.currentpage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllProduct();

  }
}
