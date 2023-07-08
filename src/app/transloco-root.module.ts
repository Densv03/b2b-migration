import { Injectable, isDevMode, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TranslocoLoader,
  translocoConfig,
  TranslocoModule,
  provideTranslocoConfig,
  provideTranslocoLoader
} from '@ngneat/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    provideTranslocoConfig(
      translocoConfig({
        availableLangs: ['en', 'ru'],
        defaultLang: 'en',
        // Remove this option if your application
        // doesn't support changing language in runtime.
        // reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    ),
    provideTranslocoLoader(TranslocoHttpLoader)
  ]
})
export class TranslocoRootModule {}
