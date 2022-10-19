import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

const BANNER_IMAGES = [
  '/assets/images/footer_banner_mobile.png',
  '/assets/images/footer_banner_768.png',
  '/assets/images/footer_banner_1120.png',
  '/assets/images/footer_banner_1440.png',
];

interface FooterBannerState {
  width: number;
}

@Component({
  selector: 'app-footer-banner',
  templateUrl: './footer-banner.component.html',
  styleUrls: ['./footer-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBannerComponent extends RxState<FooterBannerState> {
  // EVENTS
  signupClick$ = new Subject();

  // STATE
  bannerImage$ = this.select('width').pipe(
    map(width => (width < 768 ? 0 : width < 1119 ? 1 : width < 1439 ? 2 : 3)),
    map(index => BANNER_IMAGES[index])
  );

  constructor() {
    super();

    // this.connect('width', this.globalState.select('width'));

    // this.hold(this.signupClick$, () => AuthDialogComponent.show(this.dialog, 'register'));
  }
}
