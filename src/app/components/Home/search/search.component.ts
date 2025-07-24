import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
search:string="";
@Output()
SearchEvent:EventEmitter<string> = new EventEmitter<string>()
search_product(){
  console.log(this.search);
  this.SearchEvent.emit(this.search)
}
}
