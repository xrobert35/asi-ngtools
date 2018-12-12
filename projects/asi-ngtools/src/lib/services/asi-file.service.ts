import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

/**
 * Service de gestion de fichier
 */
@Injectable()
export class AsiFileService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
  }

  fileToBase64(file: File, sanitize?: boolean): Observable<string> {
    return this.toBase64(file, sanitize);
  }

  fileToBase64Url(file: File, sanitize?: boolean): Observable<string> {
    return this.toBase64Url(file, sanitize);
  }

  fileToBase64Data(file: File): Observable<string> {
    return this.toBase64Data(file);
  }

  blobToBase64(blob: Blob, sanitize?: boolean): Observable<string> {
    return this.toBase64(blob, sanitize);
  }

  blobToBase64Url(blob: Blob, sanitize?: boolean): Observable<string> {
    return this.toBase64Url(blob, sanitize);
  }

  blobToBase64Data(blob: Blob): Observable<string> {
    return this.toBase64Data(blob);
  }

  private toBase64(data: any, sanitize?: boolean): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        let content: any = reader.result;
        if (!reader.result) {
          content = <string>reader['content'];
        }
        if (sanitize) {
          content = this.sanitizer.bypassSecurityTrustUrl(content);
        }
        observer.next(content);
        observer.complete();
      }
      reader.readAsDataURL(data);
    });
  }

  private toBase64Url(data: any, sanitize?: boolean): Observable<any> {
    return this.toBase64(data, sanitize);
  }

  private toBase64Data(data: any): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!reader.result) {
          observer.next(window.btoa(<string>reader['content']));
        } else {
          observer.next(window.btoa(<string>reader.result));
        }
        observer.complete();
      }
      reader.readAsBinaryString(data);
    });
  }

  /**
   * Download the blob file with the specified name
   * @param fileAsBlob the file to download as a Blob
   * @param fileName the name to give to the downloaded file
   */
  private saveToFile(fileAsBlob: File, fileName: string): void {
    // If no name is provided, we use the original name if available, or a default name
    if (!fileName) {
      if (!fileAsBlob.name) {
        fileName = 'tmpFile';
      } else {
        fileName = fileAsBlob.name;
      }
    }
    if (window.navigator.msSaveBlob) {  // IE
      window.navigator.msSaveBlob(fileAsBlob, fileName);
    } else {
      let url = window.URL.createObjectURL(fileAsBlob);
      const anchor = document.createElement('a');
      anchor.download = fileName;
      anchor.target = '_blank';
      anchor.href = url;
      anchor.dispatchEvent(new MouseEvent('click'));
    }
  }

  /**
   * Transform a Blob into a File adding a file name and a last modified date
   * @param response The blob response
   */
  private getFileFromBlobResponse(response: any): File {
    const blob: any = response.body;
    // May be null if the server doesn't explicitly add the content-disposition in the headers
    let originalFileName = response.headers.get('content-disposition');
    if (originalFileName) {
      originalFileName = originalFileName.substring(originalFileName.lastIndexOf('filename=') + 9);
    }
    // The two attributes missing to a Blob to be a File
    blob.name = originalFileName;
    blob.lastModifiedDate = new Date();
    return <File>blob;
  }

  getFileUrl(file: File): SafeResourceUrl {
    let url = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getFileAsText(fileUrl: string): Observable<string> {
    return this.http.get(fileUrl, { responseType: 'text' });
  }

  getFileAsBlob(fileUrl: string): Observable<File> {
    return this.http.get(fileUrl, { responseType: 'blob', observe : 'response' }).pipe(map((response) => {
      return this.getFileFromBlobResponse(response);
    }));
  }

  getFileAsBlobFromPostRequest(fileUrl: string, body: any): Observable<File> {
    return this.http.post(fileUrl, body, { responseType: 'blob' }).pipe(map((response) => {
      return this.getFileFromBlobResponse(response);
    }));
  }

  /**
   * Download the file at the given url
   * @param fileUrl The url of the downloadable file
   * @param fileName [Optional] The new name of the downloaded file
   */
  downloadFile(fileUrl: string, fileName?: string): Observable<void> {
    return Observable.create((observer: Subscriber<any>) => {
      this.getFileAsBlob(fileUrl).subscribe((fileAsBlob) => {
        this.saveToFile(fileAsBlob, fileName);
        observer.next();
        observer.complete();
      });
    });
  }

  /**
   * Download the file at the given url from a POST request
   * @param fileUrl The url of the downloadable file
   * @param body the POST request body
   * @param fileName [Optional] The new name of the downloaded file
   */
  downloadFileFromPostRequest(fileUrl: string, body: any, fileName?: string): Observable<void> {
    return Observable.create((observer: Subscriber<any>) => {
      this.getFileAsBlobFromPostRequest(fileUrl, body).subscribe((fileAsBlob) => {
        this.saveToFile(fileAsBlob, fileName);

        observer.next();
        observer.complete();
      });
    });
  }

  getBlobImage(fileUrl: string): Observable<Blob> {
    return this.http.get(fileUrl, { responseType: 'blob' });
  }

  uploadFile(url: string, file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url, formData);
  }
}
