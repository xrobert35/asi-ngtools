import { AsiMimeType } from './asi-file-chooser-constants';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, EventEmitter, Output, forwardRef, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AsiFileService } from "./../../services/asi-file.service";

import * as lodash from "lodash";

/**
 * Composant permettant la selection d'un fichier
 * Exemple d'utilisation :
 * <asi-file-chooser (onValueChanged)="fileSelected($event)" formControlName="logo" (onError)="imageError($event)"></asi-file-chooser>
 */
@Component({
  selector: 'asi-file-chooser',
  templateUrl: './asi-file-chooser.component.html',
  host: { 'class': 'asi-component asi-file-chooser' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsiFileChooserComponent),
      multi: true
    }
  ]
})
export class AsiFileChooserComponent extends DefaultControlValueAccessor implements AfterViewInit {

  @Input() label: string;
  @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

  @Input() fileSrc: string = null;
  @Input() fileName: string = null;

  @Input() accept: Array<AsiMimeType> | AsiMimeType;
  acceptAttribute: string = "";

  @Input() icon = "fa-paperclip";

  @Output() onError = new EventEmitter<any>();

  @ViewChild("fileInput") fileInput: any;

  dragging: boolean = false;
  loaded: boolean = false;

  fileLoaded: boolean = false;

  file: File;

  constructor(private fileService: AsiFileService, private elementRef: ElementRef, private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);

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
    if (lodash.isArray(this.accept)) {
      (<Array<AsiMimeType>>this.accept).forEach((accept) => {
        this.acceptAttribute += accept.extension + ", " + accept.mimeType + ",";
      });
    } else if (this.accept != null) {
      const aAccept: AsiMimeType = (<AsiMimeType>this.accept);
      this.acceptAttribute = aAccept.extension + ", " + aAccept.mimeType;
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
    var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

    if (!this.isValideMimeType(file.type)) {
      this.onError.emit({
        error: "FORMAT",
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
    if (lodash.isArray(this.accept)) {
      const accepts = <Array<AsiMimeType>>this.accept;
      for (let accept of accepts) {
        if (accept.mimeType == mimeType) {
          return true;
        }
      }
    } else {
      const aAccept: AsiMimeType = (<AsiMimeType>this.accept);
      return aAccept.mimeType == mimeType
    }
    return false;
  }
}