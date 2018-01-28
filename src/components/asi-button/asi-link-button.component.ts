import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'asi-link-button',
  templateUrl: 'asi-link-button.component.html',
  host: { 'class': 'asi-component asi-link-button' },
})
export class AsiLinkButtonComponent {

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() href: string = "";
  @Input() target: '_blank' | '_self' | '_parent' | '_top' = "_self";
  @Input() disabled: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "link-button-" + this.design);
  }

}