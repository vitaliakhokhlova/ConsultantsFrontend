import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HistoryObject } from '../classes';

@Component({
  selector: 'app-history-edit',
  templateUrl: './history-edit.component.html',
  styleUrls: ['./history-edit.component.css']
})
export class HistoryEditComponent implements OnInit {

  @Input() inputArray: Array<HistoryObject>;
  @Output() childForm = new EventEmitter();
  myControl = new FormControl();
  headElements = ['Durée', 'Description', "Nom de l'organisation", 'Ville'];

  constructor() { }

  ngOnInit() {
    this.myControl.setValue(this.inputArray);
  }

  add(){
    if(!this.inputArray){
      this.inputArray = new Array<HistoryObject>();
    }
    this.inputArray.push(new HistoryObject());
  }
  
  delete(item: HistoryObject): void {
    this.inputArray=this.inputArray.filter(h => h !== item);
    this.onChange();
  }

  onChange(){
    this.childForm.emit(this.inputArray);
  }

}
