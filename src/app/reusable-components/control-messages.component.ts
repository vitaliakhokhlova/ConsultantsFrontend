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
    <small danger *ngIf="errorMessage !== null">  {{errorMessage}}</small>
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
        this.control.errors.hasOwnProperty(propertyName)
      ) {
        let validatorValue = this.control.errors[propertyName];
        return validatorValue.message? validatorValue.message : ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }

}
