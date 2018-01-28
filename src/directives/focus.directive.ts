import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective {

  @Input() focus: boolean;
  
  constructor(private element: ElementRef) { }
  
  protected ngAfterViewInit() {
    this.element.nativeElement.focus();
  }
}