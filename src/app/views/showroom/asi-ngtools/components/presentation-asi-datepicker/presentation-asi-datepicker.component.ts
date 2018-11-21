import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostBinding } from '@angular/core';
import { AsiValidators } from '@asi-ngtools/lib';

@Component({
  selector: 'presentation-asi-datepicker',
  templateUrl: './presentation-asi-datepicker.component.html',
})
export class PresentationAsiDatepickerComponent {

  @HostBinding('class') class = 'flex';

  date: Date;
  myForm: FormGroup;
  minDate: Date = new Date();

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      from: [null],
      to: [null]
    });

    this.myForm.controls.from.setValidators([Validators.required,
    AsiValidators.maxDateFromControl(this.myForm.controls.to)]);
    this.myForm.controls.to.setValidators([Validators.required,
    AsiValidators.minDateFromControl(this.myForm.controls.from)]);
  }

  submit() {
    if (this.myForm.valid) {}
  }
}
