import { Component, OnInit, Output, ChangeDetectorRef, DoCheck, IterableDiffers,
  EventEmitter, Input, ElementRef, ViewChild, AfterViewInit, HostBinding } from '@angular/core';

@Component({
  selector: 'asi-breadcrumb',
  templateUrl: 'asi-breadcrumb.component.html',
})
export class AsiBreadcrumbComponent<T> implements OnInit, DoCheck, AfterViewInit {

  @HostBinding('class') class = 'asi-component asi-breadcrumb';

  /** List of items to be displayed */
  @Input() data: Array<T>;

  /** */
  @Input() trackBy: string;

  /** Allow you to add the home button */
  @Input() hideHome: boolean;

  @ViewChild('asiBreadcrumbDropdownDots') asiBreadcrumbDropdownDots: ElementRef;

  private differ: any;
  private nbElementsMax: number;
  public hideElements = false;
  public elementsDropdownOpened = false;
  /**
   * Data displayed on dom, doesn't interfere with input data
   * Needed because we sometimes hide some elements in GUI
   * But we don't want to remove them from data array
   */
  public shadowData: Array<T> = new Array<T>();
  public hiddenElements: Array<T> = new Array<T>();

  @Output('clicked')
  public clicked: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

  constructor(private ref: ChangeDetectorRef, private elRef: ElementRef, private differs: IterableDiffers) {
    this.differ = this.differs.find([]).create(null);
  }

  private checkInput() {
    if (null == this.trackBy) {
      throw new Error('AsiBreadcrumbComponent : @Input \'trackBy\' is required');
    }

    if (!this.data) {
      throw new Error('AsiBreadcrumbComponent : @Input \'data\' is required');
    }
  }

  ngOnInit() {
    this.checkInput();
  }

  // Using ngDoCheck instead of ngChanges to update on deep change (push/pop into the array)
  ngDoCheck() {
    let changes = this.differ.diff(this.data);
    if (changes) {
      this.ref.detectChanges();
      if (changes._collection) {
        this.updateShadow(changes._collection);
      } else {
        this.updateShadow(changes.collection);
      }
    }
  }

  ngAfterViewInit() {
    // Compute how many elements can be rendered depending on init width
    let breadcrumbWidth = this.elRef.nativeElement.offsetWidth;
    // (width - (home width) - ('...' width)) / max elements size
    this.nbElementsMax = Math.floor((breadcrumbWidth - 30 - 50) / 130);
    // setTimeout() avoid "ExpressionChangedAfterItHasBeenCheckedError" exception in dev mode
    setTimeout(() => this.updateShadow(this.data));
  }

  private updateShadow(newStack: Array<T>) {
    if (newStack) {
      // true -> showing '...'
      this.hideElements = newStack.length > this.nbElementsMax;
      // just display the last 'nbElementsMax'
      this.shadowData = newStack.slice(0 - this.nbElementsMax);
      this.hiddenElements = newStack.slice(0, Math.max(newStack.length - this.nbElementsMax));
    }
  }

  public getTrackedValue(element: any) {
    if (element) {
      const trackedValue: any = element[this.trackBy];
      return trackedValue;
    } else {
      return null;
    }
  }

  public clickOnElement(element: T) {
    this.elementsDropdownOpened = false;
    this.data = this.data.slice(0, this.data.indexOf(element) + 1);
    this.updateShadow(this.data);
    this.clicked.emit(this.data);
  }
}
