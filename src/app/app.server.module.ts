import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateServerLoader } from './shared/services/translate-server.loader';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export const translateServerLoaderFactory = (transferState: TransferState) => {
  return new TranslateServerLoader(transferState);
};

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState],
      },
    }),

  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
