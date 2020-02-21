import { Component, OnInit, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-mat-select',
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }],
  template: `
  <mat-form-field>
    <mat-select matNativeControl [formControlName]="controlName" [placeholder]="placeholder">
        <mat-option *ngFor="let option of options" [value]="option[propertyToGet]">
            {{option[propertyToShow]}}
        </mat-option>
    </mat-select>
</mat-form-field>
  `
})
export class MatSelectComponent implements OnInit {
  @Input() controlName: string;
  @Input() options: any[];
  @Input() propertyToShow: string;
  @Input() propertyToGet: string;
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

}
