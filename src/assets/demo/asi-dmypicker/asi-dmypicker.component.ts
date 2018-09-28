import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'presentation-asi-dmypicker',
  templateUrl: './presentation-asi-dmypicker.component.html',
})
export class PresentationAsiDmyPickerComponent {

  myForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}