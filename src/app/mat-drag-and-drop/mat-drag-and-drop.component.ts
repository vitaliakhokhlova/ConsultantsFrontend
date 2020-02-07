import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer, FormGroupDirective } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-mat-drag-and-drop',
  templateUrl: './mat-drag-and-drop.component.html',
  styleUrls: ['./mat-drag-and-drop.component.css'],
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class MatDragAndDropComponent implements OnInit {

  @Input() orderProperty: string;
  @Input() nameProperty: string;

  constructor(private parentForm: ControlContainer) {
  }

  ngOnInit() {}

  get formArray() {
    return this.parentForm.control as FormArray;
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.formArray.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.formArray.value, event.previousIndex, event.currentIndex);
    this.updateItemsPositions();
  }

  updateItemsPositions()
  {
    this.formArray.controls.forEach((item, idx) => {
      item.get(this.orderProperty).setValue(idx+1);
    })
  }
}
