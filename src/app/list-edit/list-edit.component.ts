import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {

  @Input() inputArray: any[];
  @Input() headElements?: string[];
  @Input() keysToShow: string[];
  @Input() textToShow: string;
  @Input() showDetails?: boolean;
  @Input() name: string;
  
  @Output() inputArrayChange = new EventEmitter();
  subKeysToShow = ["description"];
  subHeadElements = ['Tâche'];

  constructor() { }

  ngOnInit() {
    if(!this.inputArray){
      this.inputArray = new Array<any>();
      this.inputArrayChange.emit(this.inputArray);
    }
  }

  addItem(){
    this.inputArray.push({});
    this.onChange();
  }

  deleteItem(item): void {
    this.inputArray=this.inputArray.filter(h => h !== item);
    this.onChange();
  }

  onChange(){
    this.inputArrayChange.emit(this.inputArray);
  }

}
