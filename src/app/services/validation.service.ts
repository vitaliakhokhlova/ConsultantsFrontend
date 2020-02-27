import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
    let config = {
      required: 'Required',
      min: `Minimum value ${validatorValue.min}`,
      max: `Maximum value ${validatorValue.max}`,
      minLength: `Minimum length ${validatorValue.requiredLength}`,
      maxLength: `Maximum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
}
}
