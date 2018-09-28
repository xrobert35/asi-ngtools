import { AsiFileService } from '@asi-ngtools/lib';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'presentation-asi-image-chooser',
  templateUrl: './presentation-asi-image-chooser.component.html',
  host: { 'class': 'flex' }
})
export class PresentationAsiImageChooserComponent {

  myForm: FormGroup;

  constructor(fb: FormBuilder, private fileUtils : AsiFileService) {

    this.myForm = fb.group({
      myModel: [null, Validators.required]
    });
  }

  imageSelect(file : File){
    this.fileUtils.fileToBase64(file).subscribe((base64) =>{
      console.log(base64);
    });
  }
}