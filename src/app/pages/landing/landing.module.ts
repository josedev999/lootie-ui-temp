import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HowtoComponent } from './howto/howto.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LandingComponent,
    HowtoComponent
  ],
  exports: [
    HowtoComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    TranslateModule,
  ]
})
export class LandingModule {
}
