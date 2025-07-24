import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/ProductService/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/Product/IProduct';
import { Subject, takeUntil } from 'rxjs';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss','../../../shared/components/add-to-basket/add-to-basket.component.scss'],

})
export class ProductComponent implements OnInit,OnDestroy{
  product:IProduct= {} as IProduct;
  private destroy$=new Subject<void>();
  error:string="";
  @Output() errorEvent = new EventEmitter<string>();
  constructor(private productService:ProductService,private route:ActivatedRoute,){
}
ngOnInit(): void {
   this.GetOneProduct()
  }

GetOneProduct(){
 this.productService.GetProduct(Number(this.route.snapshot.paramMap.get('productId')))
 .pipe(takeUntil(this.destroy$))
 .subscribe({
    next:(product)=>{
      this.product =product;
      this.error="";
    },
    error:(err)=> {
      this.errorEvent.emit(err)
      
    },
  })
}


ngOnDestroy(): void {
   this.destroy$.next()
   this.destroy$.complete()
  }
}
