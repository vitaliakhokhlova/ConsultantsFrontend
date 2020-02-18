import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      min: `Minimum value ${validatorValue.min}`,
      max: `Maximum value ${validatorValue.max}`,
      minlength: `Minimum length ${validatorValue.requiredLength}`,
      maxlength: `Maximum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
}
}
