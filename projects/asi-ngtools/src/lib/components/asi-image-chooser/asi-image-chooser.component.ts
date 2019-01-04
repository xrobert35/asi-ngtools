import { AsiFileService } from './../../services/asi-file.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import {
  Component, Input, EventEmitter, AfterViewInit, Output,
  forwardRef, ViewChild, OnInit, Renderer2, ElementRef
} from '@angular/core';

@Component({
  selector: 'asi-image-chooser',
  host: { 'class': 'asi-component asi-image-chooser' },
  templateUrl: './asi-image-chooser.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiImageChooserComponent),
      multi: true
    }
  ]
})
export class AsiImageChooserComponent extends DefaultControlValueAccessor implements AfterViewInit, OnInit {

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;

  /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  /** Init the image chooser with an url */
  @Input() imageSrc: string;
  /** Init the image chooser with a base64 */
  @Input() image64: string;

  /** Icon to display when empty */
  @Input() icon = 'far fa-image';

  /** Event emitted when an image is selected */
  @Output() onImageSelected = new EventEmitter<File>();
  /** Event emitted when an error occured with the selected image */
  @Output() onError = new EventEmitter<any>();

  @ViewChild('asiFileInput') fileInput: any;

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageFile: File;

  init = false;

  constructor(private fileService: AsiFileService, private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
  }

  ngAfterViewInit() {
    if (this.imageSrc != null) {
      this.fileService.getBlobImage(this.imageSrc).subscribe(blob => {
        this.fileService.blobToBase64(blob).subscribe((base64) => {
          this.image64 = base64;
        });
        const imageName = this.imageSrc.split('/').pop();
        this.value = new Blob([blob], { type: blob.type });
        this.value.name = imageName;
        this.init = true;
      });
    } else {
      this.init = true;
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleDragEnter(): void {
    this.dragging = true;
  }

  handleDragLeave(): void {
    this.dragging = false;
  }

  handleDrop(e: Event): void {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleImageLoad(): void {
    this.imageLoaded = true;
  }

  handleInputChange(event: any) {
    const imageFile = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

    const pattern = /image-*/;
    const reader = new FileReader();

    if (!imageFile.type.match(pattern)) {
      this.onError.emit({
        error: 'FORMAT',
        file: imageFile
      });
      return;
    }

    this.loaded = false;

    this.imageFile = imageFile;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(imageFile);
  }

  _handleReaderLoaded(event: any) {
    const reader = event.target;
    this.image64 = reader.result;
    this.onImageSelected.emit(this.imageFile);
    this.loaded = true;

    this.value = this.imageFile;
  }

  writeValue(value: any): void {
    this._value = value;
    if (value == null && this.init) {
      this.imageSrc = null;
      this.image64 = null;
    }
  }
}
