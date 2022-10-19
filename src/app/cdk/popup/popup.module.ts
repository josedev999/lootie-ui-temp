import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupContainerComponent } from './popup-container.component';
import { PopoverDirective } from './popover.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [PopupContainerComponent, PopoverDirective],
  exports: [PopoverDirective],
})
export class PopupModule {}
