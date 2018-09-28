import { AsiFileService } from '@asi-ngtools/lib';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-file-chooser',
  templateUrl: './presentation-asi-file-chooser.component.html',
})
export class PresentationAsiFileChooserComponent {

  myForm: FormGroup;

  constructor(fb: FormBuilder, private fileUtils : AsiFileService) {

    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  fileSelected(file : File){
  }
}