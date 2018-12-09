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

  @Input() open = false;

  @Input() calculWidth = true;
  @Input() relativeTo: ElementRef;
  @Output() onClose = new EventEmitter();

  private dropdown: ComponentRef<AsiDropdownContainer>;

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<any>;

  constructor(private asiDropdownService: AsiDropdownService, private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // To open
    if (changes.open) {
      if (changes.open.currentValue) {
        setTimeout(() => {
          if (this.relativeTo == null) {
            this.dropdown = this.asiDropdownService.showDropdown(this.elementRef.nativeElement.parentElement, this);
          } else {
            this.dropdown = this.asiDropdownService.showDropdown(this.relativeTo.nativeElement, this);
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
