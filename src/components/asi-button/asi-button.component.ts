import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'asi-button',
  templateUrl: 'asi-button.component.html',
  host: { 'class': 'asi-component asi-button' },
})
export class AsiButtonComponent {

  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() disabled: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "button-" + this.design);
  }

}