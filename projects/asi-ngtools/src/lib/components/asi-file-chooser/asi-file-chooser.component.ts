import { AsiMimeType } from './asi-file-chooser-constants';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import {
  Component, Input, EventEmitter, Output, forwardRef, AfterViewInit,
  OnChanges, ViewChild, HostBinding, OnInit
} from '@angular/core';
import { AsiFileService } from './../../services/asi-file.service';

import * as nh from '../../native-helper';

/**
 * Composant permettant la selection d'un fichier
 * Exemple d'utilisation :
 * <asi-file-chooser (onValueChanged)="fileSelected($event)" formControlName="logo" (onError)="imageError($event)"></asi-file-chooser>
 */
@Component({
  selector: 'asi-file-chooser',
  templateUrl: './asi-file-chooser.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiFileChooserComponent),
      multi: true
    }
  ]
})
export class AsiFileChooserComponent extends DefaultControlValueAccessor implements AfterViewInit, OnChanges, OnInit {

  @HostBinding('class') class = 'asi-component asi-file-chooser';

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = 'top';

  @Input() fileSrc: string = null;
  @Input() fileName: string = null;

  @Input() accept: Array<AsiMimeType> | AsiMimeType;
  acceptAttribute = '';

  @Input() icon = 'fa fa-paperclip';

  @Output() onError = new EventEmitter<any>();

  @ViewChild('fileInput') fileInput: any;

  dragging = false;
  loaded = false;
  fileLoaded = false;

  file: File;

  constructor(private fileService: AsiFileService) {
    super();
  }

  ngOnInit() {
    this.class += ' label-' + this.labelPosition;
  }

  ngAfterViewInit() {
    if (this.fileSrc != null) {
      this.fileService.getFileAsBlob(this.fileSrc).subscribe(blob => {
        const fileName = this.fileSrc.split('/').pop();
        const file: any = new Blob([blob], { type: blob.type });
        file.name = fileName;
        this.value = blob;
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

    if (this.fileName) {
      file.name = this.fileName;
    }
    this.value = file;
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
