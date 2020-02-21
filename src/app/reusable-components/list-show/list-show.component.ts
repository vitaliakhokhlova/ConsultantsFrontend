import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-show',
  templateUrl: './list-show.component.html',
  styleUrls: ['./list-show.component.css']
})
export class ListShowComponent implements OnInit {

  @Input() inputArray: any[];
  @Input() buttonsArray?: {type: string, placeholder: string, class: string, iconClass: string}[];
  @Input() fieldsToShow: {property: string, placeholder: string}[];
  keysToShowPlus: string[];
  @Output() itemToEmit = new EventEmitter();

  dataSource: MatTableDataSource<any>;
 

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor
  (  ) { 
  }

  ngOnInit() {  
    this.keysToShowPlus = new Array<string>();
    this.fieldsToShow.forEach(field =>
      {
        this.keysToShowPlus.push(field.property);
      });
      if(this.buttonsArray){
    for(let button of this.buttonsArray)
    {  
      this.keysToShowPlus.push(button.type); 
    }}
    this.dataSource = new MatTableDataSource(this.inputArray);
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    this.dataSource.sort = this.sort;    
  }
  
  ngOnChanges() {
    this.ngOnInit();
  }

  buttonFunction(button_number: number, line_number: number){
    let item = {button_number: button_number, line_number: line_number};
    this.itemToEmit.emit(item);
  }

  getProperty = (obj, path: string) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

}


