import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { RxFormGroup } from '@rxweb/reactive-form-validators';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-force-choice',
  templateUrl: './force-choice.component.html',
  styleUrls: ['./force-choice.component.css']
})
export class ForceChoiceComponent implements OnInit {

  @Input() parentForm: RxFormGroup;

  constructor() {}

  ngOnInit() {
  }

  get forces() {
    return this.parentForm.get('forces') as FormArray;
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.forces.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.forces.value, event.previousIndex, event.currentIndex);
    this.correctForcePositions();
  }

  correctForcePositions()
  {
    this.forces.controls.forEach((force, idx) => {
      force.get('position').setValue(idx+1);
    })
    
  }
}
