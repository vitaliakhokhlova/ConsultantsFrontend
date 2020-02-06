import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mat-drag-and-drop',
  templateUrl: './mat-drag-and-drop.component.html',
  styleUrls: ['./mat-drag-and-drop.component.css']
})
export class MatDragAndDropComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() arrayName: string;
  @Input() positionField: string;
  @Input() subproperty: string;

  constructor() {}

  ngOnInit() {

  }

  resolve(path: string, obj: any) {
    return path.split('.').reduce
    (
      function(prev, curr) 
      {
        return prev ? prev[curr] : null
      }, 
      obj || self
    )
}

  get items() {
    return this.parentForm.get(this.arrayName) as FormArray;
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.items.value, event.previousIndex, event.currentIndex);
    this.updateItemsPositions();
  }

  updateItemsPositions()
  {
    this.items.controls.forEach((item, idx) => {
      item.get(this.positionField).setValue(idx+1);
    })
  }
}
