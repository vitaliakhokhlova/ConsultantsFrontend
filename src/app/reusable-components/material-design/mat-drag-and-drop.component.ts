import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer, FormGroupDirective, FormGroup, Form } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mat-drag-and-drop',
  styleUrls: ['./material-design.css'],
  template: `  
  <div cdkDropListGroup class="example-container" >
  <div *ngFor="let list of lists; let i=index"> 
    {{text[i]}}
    <div cdkDropList  class="example-list" [cdkDropListData]="list.controls" (cdkDropListDropped)="drop($event, i)">
    <div cdkDrag class="example-box" *ngFor="let item of list.controls">
      {{item.get(nameProperty).value}} 
    </div>
  </div>
  </div>
  </div>
  `
})
export class MatDragAndDropComponent implements OnInit {

  @Input() orderProperty: string;
  @Input() nameProperty: string;
  @Input() destination: FormArray;
  @Input() source: FormArray;
  lists: any[];
  text = ['Ajouter dans cette liste','...à partir de cette liste'];

  constructor() {
  }

  ngOnInit() {
    this.lists = new Array<any>();
    this.lists.push(this.destination);
    this.lists.push(this.source);
  }
  
  dropInArray(event, i: number) {
    if(i==0){
    moveItemInArray(this.destination.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.destination.value, event.previousIndex, event.currentIndex);
    this.updateItemsPositions();
  }
  }

  dropFromAnotherArray(event, i: number){
    if(i==0){
      let newForce =event.previousContainer.data[event.previousIndex];
      newForce.patchValue({id: 0});
      (<FormArray>this.destination).push(newForce);
      this.source.removeAt(event.previousIndex);
    }
    else{
      console.log(event.previousContainer.data[event.previousIndex]);
      (<FormArray>this.source).push(event.previousContainer.data[event.previousIndex]);
      this.destination.removeAt(event.previousIndex);
    }      
    this.updateItemsPositions();
  }

  drop(event, i: number) {
    if (event.previousContainer === event.container) {
      this.dropInArray(event, i);
    } else {
      this.dropFromAnotherArray(event, i);
    }
  }

  updateItemsPositions()
  {
    this.destination.controls.forEach((item, idx) => {
      item.get(this.orderProperty).setValue(idx+1);
    })
  }
}
