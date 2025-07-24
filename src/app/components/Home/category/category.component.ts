import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interface/Category/ICategory';
import { CategoryService } from 'src/app/services/CategoryService/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  All:ICategory={name:"All",id:0,createdDate: new Date,updatedDate:null};
  currentCategory:string="All";
  category$!:Observable<ICategory[]>;
  @Output() 
  CategoryEvent:EventEmitter<string> = new EventEmitter<string>();

 constructor(private categoryService:CategoryService){}
 
  ngOnInit(): void {
    this.getallCategory()
  }
   trackCategory(index:number,item:ICategory){
      return item.id
    }
   

 getallCategory(){
  this.category$=this.categoryService.GetCategory()
 }

 emitCategoryEvent(category:string){
  this.currentCategory=category;
   this.CategoryEvent.emit(this.currentCategory);
 }
}
