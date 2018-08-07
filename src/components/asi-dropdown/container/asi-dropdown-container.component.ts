import { AsiDropdownService } from './../asi-dropdown.service';
import { TemplateRef, Component, ElementRef, ViewChild, HostListener, Inject, Input, HostBinding } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AsiDropDown } from './../asi-dropdown.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'asi-dropdown-container',
  templateUrl: 'asi-dropdown-container.component.html'
})
export class AsiDropdownContainer {

  private static BASE_INDEX = 125;

  @HostBinding('class') class = 'asi-component asi-dropdown-container';


  index: number;

  @Input() calculWidth = true;

  @ViewChild('drop', { read: ElementRef }) drop: ElementRef;

  private subjectContainer: Subject<AsiDropdownContainer> = new Subject();

  private asiDropDownService: AsiDropdownService;

  public template: TemplateRef<any>;
  private referenceElement: any;

  constructor( @Inject(DOCUMENT) private document: any, private element: ElementRef) {
  }

  @HostListener('document:mouseup', ['$event'])
  documentClick(event: MouseEvent) {
    if (!this.drop.nativeElement.contains(event.target) && this.asiDropDownService.canClose(this.index)) {
      setTimeout(() => {
        this.subjectContainer.next(this);
        this.subjectContainer.complete();
      });
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
    let rectPos = elementRef.getBoundingClientRect();
    // Get the computed class margin (from both style + css class)
    let bodyMTop = parseInt(getComputedStyle(this.document.body).marginTop.slice(0, -2), 10);
    let bodyMLeft = parseInt(getComputedStyle(this.document.body).marginLeft.slice(0, -2), 10);

    this.drop.nativeElement.style.top = rectPos.top + elementRef.offsetHeight + this.getScrollTopValue() - bodyMTop + 'px';
    this.drop.nativeElement.style.left = rectPos.left + this.getScrollLeftValue() - bodyMLeft + 'px';

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
    this.element.nativeElement.style.zIndex = AsiDropdownContainer.BASE_INDEX + index;
  }

  public setCalculWidth(calculWidth: boolean) {
    if (calculWidth) {
      this.drop.nativeElement.style.width = this.referenceElement.offsetWidth + 'px';
    } else {
      this.drop.nativeElement.style.width = '';
    }
  }
}
