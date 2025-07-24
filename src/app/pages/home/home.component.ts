import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  {
  category:string='All';
  search:string='';
  sort:{id:number,name:string,asc:boolean}={id:1,name:"Default ↓",asc:true};
 constructor(){}

 handleCategoryEvent(category:any){
  this.category =category;  
 }
 handleSearchEvent(search:any){
  this.search =search;  
 }
 handleSortEvent(sort:any){
  this.sort =sort;  
 }
  

}
