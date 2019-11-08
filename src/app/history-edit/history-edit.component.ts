import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HistoryObject, ResourceWithDescription, HistoryObjectWithChildren } from '../classes';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {

  @Input() inputArray: Array<HistoryObject>;
  @Output() inputArrayChange:EventEmitter<Array<HistoryObject>> = new EventEmitter<Array<HistoryObject>>();
  myControl = new FormControl();
  headElements = ['Durée', 'Description', "Nom de l'organisation", 'Ville'];

  constructor() { }

  ngOnInit() {
    this.myControl.setValue(this.inputArray);
  }

  addHeader(){
    if(!this.inputArray){
      this.inputArray = new Array<HistoryObject>();
    }
    this.inputArray.push(new HistoryObject());
    this.onChange();
  }

  
  addDetail(item: HistoryObjectWithChildren){
    if(!item.details){
      item.details = new Array<ResourceWithDescription>();
    }
    item.details.push(new ResourceWithDescription());
    this.onChange();
  }
  
  deleteHistory(item: HistoryObject): void {
    this.inputArray=this.inputArray.filter(h => h !== item);
    this.onChange();
  }

  deleteDetail(detail: HistoryObjectWithChildren, item: HistoryObjectWithChildren): void {
    item.details=item.details.filter(x => x !== detail);
    this.onChange();
  }

  onChange(){
    this.inputArrayChange.emit(this.inputArray);
  }

}
