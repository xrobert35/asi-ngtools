import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'asi-button',
  host: { 'class': 'asi-component asi-button' },
  templateUrl: 'asi-button.component.html',
})
export class AsiButtonComponent implements OnInit {

  @Input() id: string;
  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() size: 'standard' | 'small' | 'mini' = 'standard';
  @Input() disabled = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, `button-${this.design}`);
    this.renderer.addClass(this.elementRef.nativeElement, `button-${this.size}`);
  }
}
