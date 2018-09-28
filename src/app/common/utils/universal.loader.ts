import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';

import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

const key: StateKey<number> = makeStateKey<number>('transfer-translate');

export class TranslateUniversalLoader implements TranslateLoader {

  constructor(private transferState: TransferState, private isServer: boolean, private httpClient: HttpClient) {}

  public getTranslation(lang: string): Observable<any> {
    return Observable.create((observer: any) => {
      if (this.isServer) {
        const json = JSON.parse(readFileSync(`dist/browser/assets/i18n/${lang}.json`, 'utf8'));
        this.transferState.set(key, json);
        observer.next(this.transferState.get(key, null));
        observer.complete();
      } else if (!this.transferState.hasKey(key)) {
        this.httpClient.get(`assets/i18n/${lang}.json`).subscribe((json) => {
          this.transferState.set(key, json);
          observer.next(this.transferState.get(key, null));
          observer.complete();
        });
      } else {
        observer.next(this.transferState.get(key, null));
        observer.complete();
      }
    });
  }
}
