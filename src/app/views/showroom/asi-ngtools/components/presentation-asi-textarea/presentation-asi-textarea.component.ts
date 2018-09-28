import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-textarea',
  templateUrl: './presentation-asi-textarea.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiTextAreaComponent {

  myForm: FormGroup;
  textareaValue : string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }
}