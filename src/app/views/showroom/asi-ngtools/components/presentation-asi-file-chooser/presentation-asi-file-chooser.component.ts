import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-file-chooser',
  templateUrl: './presentation-asi-file-chooser.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiFileChooserComponent {

  myForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  fileSelected(file: File) {
    console.log('File chosen: ' + file.name);
  }
}