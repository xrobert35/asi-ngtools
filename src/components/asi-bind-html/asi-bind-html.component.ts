import { AsiFileService } from './../../services/asi-file.service';
import { Component, Input, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'asi-bind-html',
  template: '<div><div>',
  host: { 'class': 'asi-component asi-bind-html' },
})
export class AsiBindHtml {

  @Input() value: string;
  @Input() fromUrl: string;

  constructor(private renderer: Renderer, private elementRef: ElementRef, private fileService: AsiFileService) {
  }

  ngOnChanges() {
    this.initContent();
  }

  initContent(): void {
    if (this.fromUrl != null) {
      this.fileService.getFileAsText(this.fromUrl).subscribe((result) => {
        this.value = result;
        this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', this.value);
      });
    } else {
      this.renderer.setElementProperty(this.elementRef.nativeElement, 'innerHTML', this.value);
    }
  }
}