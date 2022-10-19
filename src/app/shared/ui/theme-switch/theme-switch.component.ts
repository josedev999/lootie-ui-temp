import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxState, selectSlice } from '@rx-angular/state';
import { PushModule } from '@rx-angular/template';
import { CommonModule, NgClass, NgIf } from '@angular/common';

type ViewClass = 'desktop' | 'mobile';

export interface ThemeSwitchState {
  isLightTheme: boolean;
  viewClass: ViewClass;
}

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PushModule,
  ]
})
export class ThemeSwitchComponent extends RxState<ThemeSwitchState> {
  @Input() set viewClass(viewClass: ViewClass) {
    this.set({ viewClass });
  }

  // STATE
  vm$: Observable<{ viewClass: ViewClass; isLightTheme: boolean }> = this.select(
    selectSlice(['isLightTheme', 'viewClass']),
    map(({ viewClass, isLightTheme }) => ({
      viewClass: viewClass,
      isLightTheme,
    }))
  );

  // EVENTS
  change$ = new Subject<string>();

  constructor() {
    super();

    // this.vm$.subscribe(d => console.log('D RECEIVED: ', d));
    this.set({ viewClass: 'desktop', isLightTheme: false });
  }
}
