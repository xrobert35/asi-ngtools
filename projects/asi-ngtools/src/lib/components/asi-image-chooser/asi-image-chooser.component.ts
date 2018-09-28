import { AsiFileService } from './../../services/asi-file.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import {
  Component, Input, EventEmitter, AfterViewInit, Output,
  forwardRef, ViewChild, HostBinding, OnInit
} from '@angular/core';

/**
 * Composant permettant la selection d'une image
 * Exemple d'utilisation :
 * <asi-image-chooser (onImageSelected)="imageSelect($event)" formControlName="logo" (onError)="imageError($event)"></asi-image-chooser>
 */
@Component({
  selector: 'asi-image-chooser',
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

  @HostBinding('class') class = 'asi-component asi-image-chooser';

  @Input() id: string;
  @Input() name: string;

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() imageSrc: string;
  @Input() image64: string;

  @Input() icon = 'fa fa-picture-o';

  @Output() onImageSelected = new EventEmitter<File>();
  @Output() onError = new EventEmitter<any>();

  @ViewChild('asiFileInput') fileInput: any;

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageFile: File;

  init = false;

  constructor(private fileService: AsiFileService) {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
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
