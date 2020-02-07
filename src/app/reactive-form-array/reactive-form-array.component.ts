import { Component, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-array',
  templateUrl: './reactive-form-array.component.html',
  styleUrls: ['./reactive-form-array.component.css'],
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class ReactiveFormArrayComponent {
  @Input() properties: string[];
  @Input() placeholders: string[];
  @Input() subproperty?: string;
  @Input() subpropertyPlaceholder?: string;

  constructor(private parentForm: ControlContainer) { 
    }

  get formArray(){
    return this.parentForm.control as FormArray;
  }

  delete(i: number) {
    this.formArray.removeAt(i);
  }
}
