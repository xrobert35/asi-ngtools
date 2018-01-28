import { AsiFileService } from './../../services/asi-file.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultControlValueAccessor } from './../common/default-control-value-accessor';
import { Component, Input, EventEmitter, Output, forwardRef, ElementRef, Renderer2, ViewChild } from '@angular/core';

/**
 * Composant permettant la selection d'une image
 * Exemple d'utilisation :
 * <asi-image-chooser (onImageSelected)="imageSelect($event)" formControlName="logo" (onError)="imageError($event)"></asi-image-chooser>
 */
@Component({
    selector: 'asi-image-chooser',
    templateUrl: './asi-image-chooser.component.html',
    host: { 'class': 'asi-component asi-image-chooser' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AsiImageChooserComponent),
            multi: true
        }
    ]
})
export class AsiImageChooserComponent extends DefaultControlValueAccessor {

    @Input() label: string;
    @Input() labelPosition: 'top' | 'left' | 'right' | 'bottom' | 'bottom-center' | 'top-center' = "top";

    @Input() imageSrc: string;
    @Input() image64: string;

    @Input() icon = "fa-picture-o";

    @Output() onImageSelected = new EventEmitter<File>();
    @Output() onError = new EventEmitter<any>();

    @ViewChild("fileInput") fileInput: any;

    dragging: boolean = false;
    loaded: boolean = false;
    imageLoaded: boolean = false;
    imageFile: File;

    init = false;

    constructor(private fileService: AsiFileService, private elementRef: ElementRef, private renderer: Renderer2) {
        super();
    }

    ngAfterViewInit() {
        this.renderer.addClass(this.elementRef.nativeElement, "label-" + this.labelPosition);

        if (this.imageSrc != null) {
            this.fileService.getBlobImage(this.imageSrc).subscribe(blob => {
                this.fileService.blobToBase64(blob).subscribe((base64) => {
                    this.image64 = base64;
                });
                var imageName = this.imageSrc.split('/').pop();
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
        var imageFile = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];

        var pattern = /image-*/;
        var reader = new FileReader();

        if (!imageFile.type.match(pattern)) {
            this.onError.emit({
                error: "FORMAT",
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
        var reader = event.target;
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