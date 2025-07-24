import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SortComponent {
  optionlist:{id:number,name:string,asc:boolean}[]=[
    {id:1,name:"Default ↓",asc:true},
    {id:2,name:"name ↓",asc:true},
    {id:3,name:"name ↑",asc:false},
    {id:4,name:"price ↓",asc:true},
    {id:5,name:"price ↑",asc:false},
  ];
selectedSort:{id:number,name:string,asc:boolean}=this.optionlist[0];
@Output() 
  SortEvent:EventEmitter<{id:number,name:string,asc:boolean}> = new EventEmitter<{id:number,name:string,asc:boolean}>();
constructor(){}
OnSelect(){
  this.SortEvent.emit(this.selectedSort);
}
}
