import { AsiMimeType } from './asi-file-chooser-constants';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import {
  Component, Input, EventEmitter, Output, forwardRef,
  OnChanges, ViewChild, OnInit, ElementRef, Renderer2
} from '@angular/core';
import { AsiFileService } from './../../services/asi-file.service';

import * as nh from '../../native-helper';

@Component({
  selector: 'asi-file-chooser',
  host: { 'class': 'asi-component asi-file-chooser' },
  templateUrl: './asi-file-chooser.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiFileChooserComponent),
      multi: true
    }
  ]
})
export class AsiFileChooserComponent extends DefaultControlValueAccessor implements OnChanges, OnInit {

  /** html id */
  @Input() id: string;
  /** html name */
  @Input() name: string;
   /** Label to display (is translated) */
  @Input() label: string;
  /** Label position */
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';
  /** Preload filechooser with an url */
  @Input() fileSrc: string = null;
  /** Allow you to force the name of the file */
  @Input() fileName: string = null;
  /** Liste of mimetype : "application/pdf" */
  @Input() accept: Array<AsiMimeType> | AsiMimeType;
  /** Icon to display */
  @Input() icon = 'fa fa-paperclip';

  /** Event emitted when an error occured with the selected file */
  @Output() onError = new EventEmitter<any>();

  acceptAttribute = '';

  @ViewChild('fileInput') fileInput: any;

  dragging = false;
  loaded = false;
  fileLoaded = false;

  file: File;

  constructor(private fileService: AsiFileService,
    private renderer: Renderer2,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'label-' + this.labelPosition);
    if (this.fileSrc != null) {
      this.fileService.getFileAsBlob(this.fileSrc).subscribe(blob => {
        const fileName = this.fileName || this.fileSrc.split('/').pop();
        const file: any = new Blob([blob], { type: blob.type });
        file.name = fileName;
        this.value = file;
      });
    }
  }

  ngOnChanges() {
    if (nh.isArray(this.accept)) {
      (<Array<AsiMimeType>>this.accept).forEach((accept) => {
        this.acceptAttribute += accept.extension + ', ' + accept.mimeType + ',';
      });
    } else if (this.accept != null) {
      const aAccept: AsiMimeType = (<AsiMimeType>this.accept);
      this.acceptAttribute = aAccept.extension + ', ' + aAccept.mimeType;
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.value = null;
    this.fileInput.nativeElement.click();
  }

  getFileUrl(): SafeResourceUrl {
    return this.fileService.getFileUrl(this.value);
  }

  clean(): void {
    this.value = null;
  }

  handleDragEnter() {
    this.dragging = true;
  }

  handleDragLeave() {
    this.dragging = false;
  }

  handleDrop(e: Event) {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
  }

  handleFileLoad() {
    this.fileLoaded = true;
  }

  handleInputChange(event: any) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

    if (!this.isValideMimeType(file.type)) {
      this.onError.emit({
        error: 'FORMAT',
        file: file
      });
      return;
    }
    this.loaded = false;
    this.value = file;
  }

  downloadForIE() {
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(this.value, this.value.name);
    }
  }

  private isValideMimeType(mimeType: string): boolean {
    if (!this.accept) {
      return true;
    }
    if (nh.isArray(this.accept)) {
      const accepts = <Array<AsiMimeType>>this.accept;
      for (let accept of accepts) {
        if (accept.mimeType === mimeType) {
          return true;
        }
      }
    } else {
      const aAccept: AsiMimeType = (<AsiMimeType>this.accept);
      return aAccept.mimeType === mimeType
    }
    return false;
  }
}
