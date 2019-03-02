import { AbstractControl, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';

import * as nh from '../native-helper';
import moment from 'moment';

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

  static dateFormat(control: AbstractControl): ValidationErrors | null {
    if (control.value != null && control.value.error) {
      return {
        format: { valid: false }
      };
    } else {
      return null;
    }
  }

  static fileSize(maxSize: number): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      const rightSize = !control.value || control.value.size <= maxSize;
      return rightSize ? null : { 'fileSize': { valid: false } };
    };
    return validator;
  }

  static fileExtension(extensions: Array<String>): ValidatorFn {
    const validator = (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !control.value.name) {
        return null;
      }
      const rightExtension = nh.find(extensions, (extension) => control.value.name.endsWith(extension));
      return rightExtension ? null : { fileExtension: { valid: false } };
    };
    return validator;
  }
}
