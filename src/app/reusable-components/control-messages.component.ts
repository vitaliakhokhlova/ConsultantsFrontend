import { Component, Input, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'control-messages',
  viewProviders: [{ 
    provide: ControlContainer, 
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }],
  template: `
    <div *ngIf="errorMessage !== null">  {{errorMessage}}</div>  
  `
})
export class ControlMessagesComponent  {
  @Input() key: string;

  constructor(private parentForm: ControlContainer) {
  }

  get control(){
    return this.parentForm.control.get(this.key);
  }

  get errorMessage() {  
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }

}