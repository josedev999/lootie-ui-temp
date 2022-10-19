import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeSwitchComponent } from './shared/ui/theme-switch/theme-switch.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PushModule } from '@rx-angular/template';
import { FullUrlPipe } from './shared/ui/pipes/full-url.pipe';
import { LandingModule as EntityLandingModule } from './entities/landing/landing.module';
import { LandingModule } from './pages/landing/landing.module';
import { TransferHttpCacheModule } from '@nguniversal/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'lootie'}),
    AppRoutingModule,
    HttpClientModule,
    TransferHttpCacheModule,
    ThemeSwitchComponent,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useClass: TranslateHttpLoader,
        deps: [HttpClient],
      },
    }),
    PushModule,
    FullUrlPipe,
    EntityLandingModule,
    LandingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
