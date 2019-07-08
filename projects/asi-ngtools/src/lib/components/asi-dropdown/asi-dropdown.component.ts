import {
  EventEmitter, Output, ElementRef, Input, Component, TemplateRef,
  ViewChild, OnChanges, SimpleChanges, ComponentRef
} from '@angular/core';
import { AsiDropdownContainer } from './container/asi-dropdown-container.component';
import { AsiDropdownService } from './asi-dropdown.service';

@Component({
  selector: 'asi-dropdown',
  template: '<ng-template><div class="asi-dropdown"><ng-content></ng-content></div></ng-template>',
})
export class AsiDropDown implements OnChanges {

  /** Change to true to open the drowndrop */
  @Input() open = false;
  /** fix the width to the relative component width */
  @Input() calculWidth = true;
  /** link the dropdown to the component position */
  @Input() relativeTo: ElementRef;
  /** Allow you to add a class to the down drop container */
  @Input() dropDownClass = '';
  /** Event emitted when dropdown is closed (you should put you open var to false to be able to reopen) */
  @Output() onClose = new EventEmitter();
  /** Function to check if the dropdown can close on click, get the clicked element as parameter */
  @Input() canClose: Function;

  private dropdown: ComponentRef<AsiDropdownContainer>;

  @ViewChild(TemplateRef, {static: true}) contentTemplate: TemplateRef<any>;

  constructor(private asiDropdownService: AsiDropdownService, private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // To open
    if (changes.open) {
      if (changes.open.currentValue) {
        setTimeout(() => {
          if (this.relativeTo == null) {
            this.dropdown = this.asiDropdownService.showDropdown(this.elementRef.nativeElement.parentElement, this);
          } else if (this.relativeTo.nativeElement) {
            this.dropdown = this.asiDropdownService.showDropdown(this.relativeTo.nativeElement, this);
          } else if (this.relativeTo['elementRef'].nativeElement) {
            this.dropdown = this.asiDropdownService.showDropdown(this.relativeTo['elementRef'].nativeElement, this);
          } else {
            console.warn('Default choice for the down down cannot find nativeElement on the relativeTo element');
            this.dropdown = this.asiDropdownService.showDropdown(this.elementRef.nativeElement.parentElement, this);
          }
          this.dropdown.instance.setCalculWidth(this.calculWidth);
          this.dropdown.instance.onClose().subscribe(() => {
            this.destroyDropdown();
          });
        });
      } else if (this.dropdown) {
        this.dropdown.instance.close();
      }
    }
  }

  destroyDropdown() {
    this.open = false;
    this.onClose.emit();
    this.dropdown.destroy();
  }
}
