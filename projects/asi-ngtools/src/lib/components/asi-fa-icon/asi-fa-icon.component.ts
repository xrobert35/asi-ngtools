import {
  Component, Input, Output, ViewChild, ElementRef, OnInit, OnChanges,
  SimpleChanges, Renderer2, EventEmitter
} from '@angular/core';

@Component({
  selector: 'asi-fa-icon',
  host: { 'class': 'asi-component asi-fa-icon' },
  templateUrl: './asi-fa-icon.component.html'
})
export class AsiFaIconComponent implements OnInit, OnChanges {

  /** icon from fontawesome website */
  @Input() icon: string;
  /** icon size */
  @Input() size: '1x' | '2x' | '3x' | '4x';
  /** label to display (is translated) */
  @Input() label: string;
  /** label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  /** Click on the icon submit form */
  @Input() submit = false;
  /** is enabled/disabled */
  @Input() disabled: boolean;
  /** tooltip when mouse over */
  @Input() tooltip: string;
  /** tooltip position */
  @Input() tooltipPosition: 'top' | 'left' | 'right' | 'bottom' = 'bottom';
  /** disable click on label */
  @Input() noClickOnLabel = false;

  /** event emitted when click on label or icon */
  @Output() onClick = new EventEmitter<MouseEvent>();

  @ViewChild('tooltipView') tooltipElement: ElementRef;
  @ViewChild('icon') iconElement: ElementRef;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    this.renderer.addClass(this.tooltipElement.nativeElement, 'tooltip-' + this.tooltipPosition);

    if (this.icon != null) {
      this.renderIcons(this.icon);
    }

    if (this.size != null) {
      this.renderSize(this.size);
    }
  }

  /**
   * Allow to dynamically change the rendered icon and size
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.icon && !changes.icon.isFirstChange()) {
      let iconChange = changes.icon;
      this.resetClasses(iconChange.previousValue);
      this.renderIcons(iconChange.currentValue);
    }
    if (changes.size && !changes.size.isFirstChange()) {
      let sizeChange = changes.size;
      this.resetClasses(sizeChange.previousValue);
      this.renderSize(sizeChange.currentValue);
    }
  }

  public click(event: MouseEvent) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }

  /**
   * @param oldIcons string representing the classes to remove
   */
  private resetClasses(oldIcons: string) {
    if (!!oldIcons) {
      let oldIconsArray = oldIcons.trim().split(' ');
      oldIconsArray.forEach((icon) => {
        this.renderer.removeClass(this.iconElement.nativeElement, icon);
      });
    }
  }

  /**
   * Add classes from a string
   * @param icons string representing css classes
   */
  private renderIcons(icons: string) {
    if (!!icons) {
      let newIcons = icons.trim().split(' ');
      newIcons.forEach((icon) => {
        this.renderer.addClass(this.iconElement.nativeElement, icon);
      });
    }
  }

  /**
   * @param size the font awesome css class representing the icon size
   */
  private renderSize(size: string) {
    if (!!size) {
      this.renderer.addClass(this.iconElement.nativeElement, 'fa-' + size);
    }
  }
}
