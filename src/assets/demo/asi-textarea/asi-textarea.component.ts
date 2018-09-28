import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'asi-textarea-presentation',
  templateUrl: './asi-textarea-presentation.component.html'
})
export class AsiTextareaPresentationComponent {

  textareaValue : string;

  //Form declaration
  myForm: FormGroup;

  constructor(fb: FormBuilder){
    this.myForm = fb.group({
      myModel : [null, Validators.required]
    });
  }
}
