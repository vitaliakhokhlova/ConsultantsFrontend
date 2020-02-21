import { Component, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-reactive-form-array',
  templateUrl: './reactive-form-array.component.html',
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class ReactiveFormArrayComponent {
  @Input() properties: string[];
  @Input() placeholders: string[];

  constructor(private parentForm: ControlContainer) { 
    }

  get formArray(){
    return this.parentForm.control.parent as FormArray;
  }

  delete() {
    let last = this.parentForm.path.length-1;
    let i = this.parentForm.path[last];
    this.formArray.removeAt(+i);
  }
}
