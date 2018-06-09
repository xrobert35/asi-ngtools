import { Observable, Subscriber } from 'rxjs';
import { Http, RequestOptions, ResponseContentType, Headers } from '@angular/http';
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

/** 
 * Service de gestion de fichier
 */
@Injectable()
export class AsiFileService {

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  fileToBase64(file: File, sanitize?: boolean): Observable<string> {
    return this.toBase64(file, sanitize);
  }

  blobToBase64(blob: Blob, sanitize?: boolean): Observable<string> {
    return this.toBase64(blob, sanitize);
  }

  private toBase64(data: any, sanitize?: boolean): Observable<any> {
    return Observable.create((observer: Subscriber<any>) => {
      var reader = new FileReader();
      reader.onloadend = () => {
        var content = reader.result;
        if (sanitize) {
          content = this.sanitizer.bypassSecurityTrustUrl(content);
        }
        observer.next(content);
        observer.complete();
      }
      reader.readAsDataURL(data);
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
        fileName = "tmpFile";
      } else {
        fileName = fileAsBlob.name;
      }
    }
    if (window.navigator.msSaveBlob) {  //IE
      window.navigator.msSaveBlob(fileAsBlob, fileName);
    } else {  //Le reste
      let url = window.URL.createObjectURL(fileAsBlob);
      var anchor = document.createElement("a");
      anchor.download = fileName;
      anchor.target = '_blank';
      anchor.href = url;
      anchor.dispatchEvent(new MouseEvent("click"));
    }
  }

  /**
   * Transform a Blob into a File adding a file name and a last modified date
   * @param response The blob response
   */
  private getFileFromBlobResponse(response : any): File {
    let blob: any = response.blob();
    // May be null if the server doesn't explicitly add the content-disposition in the headers
    let originalFileName = response.headers.get("content-disposition");
    if (originalFileName) {
      originalFileName = originalFileName.substring(originalFileName.lastIndexOf('filename=')  +  9);
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
    return this.http.get(fileUrl).pipe(map((res) => res.text()));
  }

  getFileAsBlob(fileUrl: string): Observable<File> {
    let requestOptions = new RequestOptions();
    requestOptions.responseType = ResponseContentType.Blob;
    return this.http.get(fileUrl, requestOptions).pipe(map((response) => {
      return this.getFileFromBlobResponse(response);
    }));
  }

  getFileAsBlobFromPostRequest(fileUrl: string, body: any): Observable<File> {
    let requestOptions = new RequestOptions();
    requestOptions.responseType = ResponseContentType.Blob;
    return this.http.post(fileUrl, body, requestOptions).pipe(map((response) => {
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
    let requestOptions = new RequestOptions();
    requestOptions.responseType = ResponseContentType.Blob;
    return this.http.get(fileUrl, requestOptions).pipe(map((response) => response.blob()));
  }

  uploadFile(url: string, file: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, formData, options);
  }
}