import { Component, Input, OnInit, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'asi-link-button',
  host: { 'class': 'asi-component asi-link-button' },
  templateUrl: 'asi-link-button.component.html'
})
export class AsiLinkButtonComponent implements OnInit, OnChanges {

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() href = '';
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() disabled = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, `link-button-${this.design}`);
  }

  ngOnChanges() {
    if (this.disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'disabled');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'disabled');
    }
  }
}
