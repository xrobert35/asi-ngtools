import {
  Component, Input, Output, ViewChild, ElementRef, OnInit, OnChanges,
  SimpleChanges, Renderer2, EventEmitter, HostBinding
} from '@angular/core';

@Component({
  selector: 'asi-fa-icon',
  templateUrl: './asi-fa-icon.component.html'
})
export class AsiFaIconComponent implements OnInit, OnChanges {

  @HostBinding('class') class = 'asi-component asi-fa-icon';

  @Input() icon: string;
  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  @Input() submit = false;

  @Input() size: string = null;
  @Input() disabled: boolean;
  @Input() tooltip: boolean;
  @Input() tooltipPosition: 'top' | 'left' | 'right' | 'bottom' = 'bottom';
  @Input() noClickOnLabel = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  @ViewChild('tooltipView') tooltipElement: ElementRef;
  @ViewChild('icon') iconElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
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
