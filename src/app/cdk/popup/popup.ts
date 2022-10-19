import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  PLATFORM_ID,
  TemplateRef,
  Type,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PopupContainerComponent } from './popup-container.component';
import { NavigationStart, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { createPopper, Instance } from '@popperjs/core';

export type Side = 'top' | 'right' | 'bottom' | 'left';

export type Position = 'auto' | 'top' | 'right' | 'bottom' | 'left';

export interface PopupConfig {
  anchor: HTMLElement;
  position?: Position;
  coords?: { top?: string; right?: string };
  adjustWidth?: boolean;
  // Name of the popup - used for toggling functionality
  name?: string;
}

// export class PopupConfig {
//   anchor: HTMLElement;
//
//   adjustWidth?: boolean;
//   // Which side of the anchor should be used for alignment
//   anchorAlignment?: Side;
//   // Which side of the popup should be used for alignment
//   popupAlignment?: Side;
//   // Name of the popup - used for toggling functionality
//   name?: string;
// }

export class PopupRef {
  element!: HTMLElement;
}

@Injectable({ providedIn: 'root' })
export class Popup {
  activePopupName = '';

  change$ = new Subject<string>();

  private componentFactoryResolver: ComponentFactoryResolver;
  private overlayComponentFactory: ComponentFactory<PopupContainerComponent>;

  private popupHost!: HTMLElement;

  private activePopup!: ComponentRef<PopupContainerComponent>;
  private popper!: Instance;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router
  ) {
    this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver) as ComponentFactoryResolver;
    this.overlayComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupContainerComponent);

    if (isPlatformBrowser(platformId)) {
      this.popupHost = document.body.appendChild(document.createElement('div'));
      this.popupHost.className = 'lootie-popup-host';

      // window.addEventListener('click', () => {
      //   this.close();
      // });
    }

    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationStart),
        tap(() => this.close())
      )
      .subscribe();
  }

  toggle(content: TemplateRef<any> | Type<any>, config: PopupConfig) {
    if (!config.name) {
      throw new Error('Can not toggle popup without a name');
    }

    if (this.activePopupName === config.name) {
      this.close();
    } else {
      this.open(content, config);
    }
  }

  open(content: TemplateRef<any> | Type<any>, config: PopupConfig): PopupRef {
    const injector = Injector.create({ providers: [], parent: this.injector });
    const cmp = this.overlayComponentFactory.create(injector);
    this.close();

    this.activePopup = cmp;
    this.activePopupName = config.name || '';
    this.change$.next(this.activePopupName);

    this.appRef.attachView(cmp.hostView);
    this.popupHost.appendChild(cmp.location.nativeElement);

    window.addEventListener('click', this.closeListener);

    setTimeout(() => {
      this.popper = createPopper(config.anchor, this.popupHost, { placement: 'bottom' });
    });

    if (content instanceof TemplateRef) {
      cmp.instance.template = content;
    } else {
      cmp.instance.component = content;
    }

    return { element: cmp.location.nativeElement as HTMLElement };
  }

  close() {
    if (this.activePopup) {
      this.activePopupName = '';
      this.activePopup.destroy();
      this.popper.destroy();
      window.removeEventListener('click', this.closeListener);

      this.change$.next('');
    }
  }

  private closeListener = () => this.close();
}
