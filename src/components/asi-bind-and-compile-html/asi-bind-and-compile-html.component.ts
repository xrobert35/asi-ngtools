import { AsiFileService } from './../../services/asi-file.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'asi-bind-and-compile-html',
  template: '<div *dynamicComponent="value; context : context;"><div>',
  host: { 'class': 'asi-component asi-bind-and-compile-html' },
})
export class AsiBindAndCompileHtml {

  @Input() value: string;
  @Input() fromUrl: string;
  @Input() context: any;

  constructor(private fileService: AsiFileService) {
  }

  ngOnInit() {
    if (this.fromUrl != null) {
      this.fileService.getFileAsText(this.fromUrl).subscribe((result) => {
        this.value = result;
      });
    }
  }
}