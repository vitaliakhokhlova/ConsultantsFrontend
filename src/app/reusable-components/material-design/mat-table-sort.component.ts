import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-mat-table-sort',
  styleUrls: ['./material-design.css'],
  template: ` 
    <div class="mat-elevation-z8">
    <table mat-table matSort class="table-striped table-bordered" [dataSource]="dataSource">
        <ng-container  *ngFor="let element of fieldsToShow" [matColumnDef]="element.property">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> 
                {{ element.placeholder | titlecase }} 
            </th>
            <td mat-cell *matCellDef="let row"> 
                {{ getProperty(row, element.property) }}
            </td>
        </ng-container>

        <ng-container *ngFor="let element of buttonsArray; let i=index" [matColumnDef]="element.type">
            <th mat-header-cell *matHeaderCellDef > 
                {{element.placeholder| titlecase}} 
            </th>
            <td mat-cell class="centeredButton" *matCellDef="let row; let j=index">
                <button mat-fab (click)="buttonFunction(i, j)" [class]="element.class">
                    <i [class]="element.iconClass"></i>
                </button>
            </td>
          </ng-container>
    
        <tr mat-header-row *matHeaderRowDef="keysToShowPlus"></tr>
        <tr mat-row *matRowDef="let row; columns: keysToShowPlus; "></tr>
    </table>
  </div>
  `  
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


