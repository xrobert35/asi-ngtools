import { Component, Input, OnInit, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'asi-button',
  host: { 'class': 'asi-component asi-button' },
  templateUrl: 'asi-button.component.html',
})
export class AsiButtonComponent implements OnInit, OnChanges {

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;
  /** html type */
  @Input() type: 'submit' | 'button' = 'button';

  /** button design */
  @Input() design: 'flat' | 'raised' | 'bordered' = 'flat';
  /** button size */
  @Input() size: 'standard' | 'small' | 'mini' = 'standard';
  /** ensable/disable the button */
  @Input() disabled = false;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, `button-${this.design}`);
    this.renderer.addClass(this.elementRef.nativeElement, `button-${this.size}`);
  }

  ngOnChanges() {
    if (this.disabled) {
      this.renderer.addClass(this.elementRef.nativeElement, 'disabled');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'disabled');
    }
  }
}
