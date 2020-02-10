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
  @Input() headElements: string[];
  @Input() keysToShow: string[];
  keysToShowPlus: string[];
  @Output() itemToDelete = new EventEmitter();

  dataSource: MatTableDataSource<any>;
  buttons = ['view', 'edit', 'delete'];
  buttonNames = ['Imprimer','Corriger','Supprimer'];
  buttonClasses = ["btn btn-info","btn btn-success","btn btn-danger"];
  buttonIconClasses = ['fas fa-eye','fas fa-user-edit','fas fa-trash-alt'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor
  (
    private router: Router
  ) { 
  }

  ngOnInit() {  
    console.log(this.inputArray);
    this.keysToShowPlus =Object.assign([],  this.keysToShow);
    for(let button of this.buttons)
    {  
      this.keysToShowPlus.push(button); 
    }
    this.dataSource = new MatTableDataSource(this.inputArray);
    this.dataSource.sort = this.sort;    
  }
  
  ngOnChanges() {
    this.ngOnInit();
  }

  buttonFunction(item, type){
    if(type == 'view'){
      this.router.navigate([`detail/${item.id}`]);  
    }
    else{
      if(type=='edit'){
        this.router.navigate([`edit/${item.id}`]);  
      }
      else{
        if(type=='delete'){
          this.itemToDelete.emit(item);
        }
      }
    }
  }
}


