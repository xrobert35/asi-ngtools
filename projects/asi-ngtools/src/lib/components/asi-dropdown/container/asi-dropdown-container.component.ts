import { AsiDropdownService } from './../asi-dropdown.service';
import { TemplateRef, Component, ElementRef, ViewChild, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AsiDropDown } from './../asi-dropdown.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'asi-dropdown-container',
  host: { 'class': 'asi-component asi-dropdown-container' },
  templateUrl: 'asi-dropdown-container.component.html'
})
export class AsiDropdownContainer {

  private static BASE_INDEX = 125;

  index: number;
  canClose: Function;

  @Input() calculWidth = true;

  @ViewChild('drop', { read: ElementRef, static: true }) drop: ElementRef;

  private subjectContainer: Subject<AsiDropdownContainer> = new Subject();

  private asiDropDownService: AsiDropdownService;

  public template: TemplateRef<any>;
  private referenceElement: any;

  constructor(@Inject(DOCUMENT) private document: any, private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('document:mouseup', ['$event'])
  documentClick(event: MouseEvent) {
    if (!this.drop.nativeElement.contains(event.target)) {
      this.asiDropDownService.canClose(this.index, this.canClose).subscribe(close => {
        if (close) {
          setTimeout(() => {
            this.close();
          });
        }
      })
    }
  }

  close() {
    this.subjectContainer.next(this);
    this.subjectContainer.complete();
  }

  // Close event when click outside
  onClose(): Observable<AsiDropdownContainer> {
    return this.subjectContainer.asObservable();
  }

  /**
   * Move the container under htmlElement
   * @param htmlElement The parent HTMLElement of the dropdown
   */
  forElement(elementRef: any) {
    this.referenceElement = elementRef;

    const rectPos = elementRef.getBoundingClientRect();

    // Get the computed class margin (from both style + css class)
    const bodyComputedStyle = getComputedStyle(this.document.body);

    const bodyMarginTop = parseInt(bodyComputedStyle.marginTop.slice(0, -2), 10);
    const bodyMarginLeft = parseInt(bodyComputedStyle.marginLeft.slice(0, -2), 10);

    const topVerticalPosition = rectPos.top + this.getScrollTopValue() - bodyMarginTop;

    if (topVerticalPosition > this.document.body.clientHeight / 2) {
      // show over the element
      this.drop.nativeElement.style.bottom = (this.document.body.clientHeight - topVerticalPosition) + 'px';
      this.drop.nativeElement.style.marginBottom = '5px';
    } else {
      // show under the element
      this.drop.nativeElement.style.top = (topVerticalPosition + elementRef.offsetHeight) + 'px';
      this.drop.nativeElement.style.marginTop = '5px';
    }

    const screenVerticalPosition = rectPos.top - bodyMarginTop;
    let bodyVerticalPosition;
    if (screenVerticalPosition > this.document.body.clientHeight / 2) {
      // show over the element
      bodyVerticalPosition = this.document.body.clientHeight - (this.getScrollTopValue() + screenVerticalPosition);
      this.drop.nativeElement.style.bottom = bodyVerticalPosition + 'px';
      this.drop.nativeElement.style.marginBottom = '2px';
    } else {
      // show under the element
      bodyVerticalPosition = this.getScrollTopValue() + screenVerticalPosition + elementRef.offsetHeight;
      this.drop.nativeElement.style.top = bodyVerticalPosition + 'px';
      this.drop.nativeElement.style.marginTop = '2px';
    }




    this.drop.nativeElement.style.left = rectPos.left + this.getScrollLeftValue() - bodyMarginLeft + 'px';

    this.drop.nativeElement.style.width = elementRef.offsetWidth + 'px';
  }

  private getScrollTopValue() {
    return this.document.body.scrollTop + this.document.documentElement.scrollTop;
  }

  private getScrollLeftValue() {
    return this.document.body.scrollLeft + this.document.documentElement.scrollLeft;
  }

  /**
   * @param element The content to display in the container
   */
  show(asiDrownDown: AsiDropDown) {
    setTimeout(() => {
      this.template = asiDrownDown.contentTemplate;
      let visibility = this.drop.nativeElement.style.visibility;
      this.drop.nativeElement.style.visibility = 'hidden';
      if (asiDrownDown.dropDownClass) {
        this.renderer.addClass(this.elementRef.nativeElement, asiDrownDown.dropDownClass);
      }
      setTimeout(() => {
        let dropRight = this.drop.nativeElement.offsetLeft + this.drop.nativeElement.offsetWidth;
        if (dropRight > this.document.documentElement.clientWidth) {
          this.drop.nativeElement.style.left = this.drop.nativeElement.offsetLeft
            + this.document.documentElement.scrollLeft - (dropRight - this.document.documentElement.clientWidth) + 'px';
        }
        this.drop.nativeElement.style.visibility = visibility;
      });
    });
  }

  public injectService(service: AsiDropdownService) {
    this.asiDropDownService = service;
  }

  public setIndex(index: number) {
    this.index = index;
    this.elementRef.nativeElement.style.zIndex = AsiDropdownContainer.BASE_INDEX + index;
  }

  public setCalculWidth(calculWidth: boolean) {
    if (calculWidth) {
      this.drop.nativeElement.style.width = this.referenceElement.offsetWidth + 'px';
    } else {
      this.drop.nativeElement.style.width = '';
    }
  }
}
