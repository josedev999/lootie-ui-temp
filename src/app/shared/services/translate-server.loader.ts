import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { join } from 'path';
import * as fs from 'fs';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TranslateServerLoader implements TranslateLoader {
  constructor(private transferState: TransferState) {}

  getTranslation(lang: string): Observable<any> {
    return new Observable(observer => {
      const assetFolder = join(process.cwd(), 'dist', 'lootie-ui-temp', 'browser', 'assets', 'i18n');

      const jsonData = JSON.parse(fs.readFileSync(`${assetFolder}/${lang}.json`, 'utf8'));

      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}
