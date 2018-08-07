import { AsiFileService } from './../../services/asi-file.service';
import { Component, Input, Renderer, ElementRef, HostBinding, OnChanges } from '@angular/core';

@Component({
  selector: 'asi-bind-html',
  template: '<div><div>',
})
export class AsiBindHtml implements OnChanges {

  @HostBinding('class') class = 'asi-component asi-bind-html';

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
