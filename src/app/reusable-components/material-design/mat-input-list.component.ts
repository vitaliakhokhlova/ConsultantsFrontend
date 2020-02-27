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
  <td class="align-top" *ngFor="let item of properties; let k=index">
      <mat-form-field class="example-full-width">
          <textarea  matInput cdkTextareaAutosize #autosize="cdkTextareaAutosize"
              cdkAutosizeMinRows="1"
              cdkAutosizeMaxRows="3"
              [formControlName]="item.property"
              [placeholder]="item.placeholder"
          >
          </textarea>
        </mat-form-field>
        <small class="form-text text-danger" *ngFor="let message of formArray.controls[n].controls[item.property]['errorMessages']">{{message}}</small>
      <!-- <control-messages [key]="item.property"></control-messages> -->
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
  @Input() properties: {property: string, placeholder: string}[];

  constructor(public parentForm: ControlContainer) {
    }

  get formArray(){
    return this.parentForm.control.parent as FormArray;
  }

  get n(){
    return this.parentForm.path[this.parentForm.path.length-1];
  }

  delete() {
    this.formArray.removeAt(+this.n);
  }
}
