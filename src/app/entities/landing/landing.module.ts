import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary/summary.component';
import { TranslateModule } from '@ngx-translate/core';
import { LetModule } from '@rx-angular/template';
import { CountUpModule } from 'ngx-countup';
import { RecentUnboxesComponent } from './recent-unboxes/recent-unboxes.component';
import { FullUrlPipe } from '../../shared/ui/pipes/full-url.pipe';
import { FooterBannerComponent } from './footer-banner/footer-banner.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule, TranslateModule, LetModule, CountUpModule, FullUrlPipe],
  declarations: [SummaryComponent, RecentUnboxesComponent, FooterBannerComponent, FooterComponent],
  exports: [SummaryComponent, RecentUnboxesComponent, FooterBannerComponent, FooterComponent]
})
export class LandingModule{

}
