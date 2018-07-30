import { Component, Input, SimpleChange, PLATFORM_ID, Inject } from '@angular/core';
import { AsiFileService } from './../../services/asi-file.service';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private fileService: AsiFileService, @Inject(PLATFORM_ID) private platformId : any) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  ngOnChanges(change: { [propName: string]: SimpleChange }) {
    if (isPlatformBrowser(this.platformId)) {
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
}