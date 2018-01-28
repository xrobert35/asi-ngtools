import { Component, Input, SimpleChange } from '@angular/core';
import { AsiFileService } from './../../services/asi-file.service';

declare const Prism: any;

@Component({
  selector: 'asi-code-viewer',
  templateUrl: './asi-code-viewer.component.html',
  host: { 'class': 'asi-component asi-code-viewer' },
})
export class AsiCodeViewer {

  @Input() language: string = 'typescript';
  @Input() fromUrl: string;
  @Input() value: string;

  hightlightCode: any;

  constructor(private fileService: AsiFileService) {
  }

  ngOnInit() {
    if (this.fromUrl != null) {
      this.fileService.getFileAsText(this.fromUrl).subscribe((result) => {
        this.value = result;
        if (this.value != null) {
          this.hightlightCode = Prism.highlight(this.value, Prism.languages[this.language]);
        }
      });
    } else if (this.value != null) {
      this.hightlightCode = Prism.highlight(this.value, Prism.languages[this.language]);
    }
  }

  ngOnChanges(change: { [propName: string]: SimpleChange }) {
    if (change.value != null && change.value.currentValue != null) {
      this.hightlightCode = Prism.highlight(change.value.currentValue, Prism.languages[this.language]);
    } else if (change.fromUrl != null) {
      this.fileService.getFileAsText(change.fromUrl.currentValue).subscribe((result) => {
        this.value = result;
        if (this.value != null) {
          this.hightlightCode = Prism.highlight(this.value, Prism.languages[this.language]);
        }
      });
    }
  }
}