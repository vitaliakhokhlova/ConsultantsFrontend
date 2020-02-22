import { Component, Input, SkipSelf } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

@Component({
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }],
  selector: 'app-mat-input-list',
  styleUrls: ['./material-design.css'],
  template: ` 
  <table class="example-full-width" cellspacing="0"><tr>
  <td *ngFor="let property of properties; let k=index">
      <mat-form-field class="example-full-width">        
          <textarea  matInput cdkTextareaAutosize #autosize="cdkTextareaAutosize" 
              cdkAutosizeMinRows="1"
              cdkAutosizeMaxRows="3"
              [formControlName]="property" 
              [placeholder]="placeholders[k]"
          >   
          </textarea>  
      </mat-form-field>
  </td>
  <td>
      <button  mat-button type="button" matSuffix mat-icon-button aria-label="Delete" (click)="delete()">
          <mat-icon>delete_forever</mat-icon>
      </button>
  </td>
</table>
  ` 
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
