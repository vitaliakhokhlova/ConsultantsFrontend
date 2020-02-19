import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer, FormGroupDirective, FormGroup, Form } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mat-drag-and-drop',
  templateUrl: './mat-drag-and-drop.component.html',
  styleUrls: ['./mat-drag-and-drop.component.css']
})
export class MatDragAndDropComponent implements OnInit {

  @Input() orderProperty: string;
  @Input() nameProperty: string;
  @Input() destination: FormArray;
  @Input() source: FormArray;

  constructor() {
  }

  ngOnInit() {}
  
  dropInArray(event, isDestination) {
    console.log("here");
    if(isDestination){
    moveItemInArray(this.destination.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.destination.value, event.previousIndex, event.currentIndex);
    this.updateItemsPositions();
  }
  }

  dropFromAnotherArray(event, isDestination){
    if(isDestination){
      let newForce =event.previousContainer.data[event.previousIndex];
      newForce.patchValue({id: 0});
      (<FormArray>this.destination).push(newForce);
      this.source.removeAt(event.previousIndex);
    }
    else{
      this.destination.removeAt(event.previousIndex);
      (<FormArray>this.source).push(event.previousContainer.data[event.previousIndex]);
    }      
    this.updateItemsPositions();
  }

  drop(event, isDestination) {
    console.log(event.previousContainer === event.container);
    if (event.previousContainer === event.container) {
      this.dropInArray(event, isDestination);
    } else {
      this.dropFromAnotherArray(event, isDestination);
    }
  }

  updateItemsPositions()
  {
    this.destination.controls.forEach((item, idx) => {
      item.get(this.orderProperty).setValue(idx+1);
    })
  }
}
