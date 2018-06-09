import { AbstractControl, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';

import * as moment from 'moment';

/**
 * Custom from  validators
 */
export class AsiValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    if (control.value == null) {
      return null;
    } else {
      return Validators.email(control);
    }
  }

  static minDateFromControl(minDateControl: AbstractControl): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && minDateControl.value != null
        && moment(control.value).isBefore(minDateControl.value, 'day')) {
        return {
          minDate: { valid: false }
        };
      } else {
        return null;
      }
    };
    return validator;
  }

  static maxDateFromControl(maxDateControl: AbstractControl): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      if (control.value != null && maxDateControl.value != null
        && moment(control.value).isAfter(maxDateControl.value, 'day')) {
        return {
          maxDate: { valid: false }
        };
      } else {
        return null;
      }
    };
    return validator;
  }
}