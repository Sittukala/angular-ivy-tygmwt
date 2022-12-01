import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

function isEmptyInput(value: any): boolean {
  if(value == null || value.length === 0 || value === ''){
    return true
  }
  return false;
}
export class CustomValidators {
 
  static message = {
    fieldReq: 'Field is Required',
  };
  static required(errorMessage: string | null = null): ValidatorFn {
  
    return (control: AbstractControl): ValidationErrors | null => {
      console.log("is",isEmptyInput(control.value))
      return isEmptyInput(control.value)
        ? {
            required: true,
            message: errorMessage || CustomValidators.message.fieldReq,
          }
        : null;
    };
  }
}
