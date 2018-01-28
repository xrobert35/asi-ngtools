import { Component, OnInit, Output, ChangeDetectorRef, DoCheck, IterableDiffers, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'asi-breadcrumb',
  templateUrl: 'asi-breadcrumb.component.html',
  host: { 'class': 'asi-component asi-breadcrumb' },
})
export class AsiBreadcrumbComponent<T> implements OnInit, DoCheck {

  @Input() public data: Array<T>;
  @Input() public trackBy: string;
  @Input() public hideHome: boolean;

  @ViewChild("asiBreadcrumbDropdownDots") asiBreadcrumbDropdownDots: ElementRef;

  private differ: any;
  private nbElementsMax: number;
  public hideElements = false;
  public elementsDropdownOpened = false;
  public shadowData: Array<T> = new Array<T>(); // Data displayed on dom, doesn't interfere with input data
  public hiddenElements: Array<T> = new Array<T>();

  @Output('clicked')
  public clicked: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

  constructor(private ref: ChangeDetectorRef, private elRef: ElementRef, private differs: IterableDiffers) {
    this.differ = this.differs.find([]).create(null);
  }

  ngOnInit() {
    if (!this.trackBy) {
      console.error('Please provide a trackBy element!');
      return;
    }
    if (!this.data) {
      console.error('Please provide the elements through the [data] property');
      return;
    }
  }

  // Using ngDoCheck instead of ngChanges to update on deep change (push/pop into the array)
  ngDoCheck() {
    var changes = this.differ.diff(this.data);
    if (changes) {
      this.ref.detectChanges();
      this.updateShadow(changes._collection);
    }
  }

  ngAfterViewInit() {
    // Compute how many elements can be rendered depending on init width
    let breadcrumbWidth = this.elRef.nativeElement.offsetWidth;
    // (width - (home width) - ('...' width)) / max elements size
    this.nbElementsMax = Math.floor((breadcrumbWidth - 30 - 50) / 130);
    setTimeout(() => this.updateShadow(this.data)); // setTimeout() avoid "ExpressionChangedAfterItHasBeenCheckedError" exception in dev mode
  }

  private updateShadow(newStack: Array<T>) {
    // true -> showing '...'
    this.hideElements = newStack.length > this.nbElementsMax;
    // just display the last 'nbElementsMax'
    this.shadowData = newStack.slice(0 - this.nbElementsMax);
    this.hiddenElements = newStack.slice(0, Math.max(newStack.length - this.nbElementsMax));
  }

  public getTrackedValue(element: T) {
    return eval('element.' + this.trackBy);
  }

  public clickOnElement(element: T) {
    this.elementsDropdownOpened = false;
    this.data = this.data.slice(0, this.data.indexOf(element) + 1);
    this.updateShadow(this.data);
    this.clicked.emit(this.data);
  }
}