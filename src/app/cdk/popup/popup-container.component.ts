import { ChangeDetectionStrategy, Component, HostListener, Injector, TemplateRef, Type } from '@angular/core';

@Component({
  template: `
    <ng-container *ngTemplateOutlet="template"></ng-container>
    <ng-container *ngComponentOutlet="component; injector: injector"></ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupContainerComponent {
  template: TemplateRef<any>;
  component: Type<any>;

  constructor(public injector: Injector) {}

  @HostListener('click', ['$event'])
  onClick(evt: MouseEvent) {
    evt.stopPropagation();
  }
}
