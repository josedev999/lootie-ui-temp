import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef } from '@angular/core';
import { Popup, PopupRef } from './popup';

@Directive({
  selector: '[lootiePopover]',
})
export class PopoverDirective {
  static timerShow = null;
  static timerClose = null;
  static activePopover = null;

  @Input() lootiePopover: TemplateRef<HTMLElement>;

  popupRef: PopupRef = null;

  isShown = false;

  unsubscribe: () => void;

  constructor(private popup: Popup, private elementRef: ElementRef<HTMLElement>, private renderer2: Renderer2) {}

  @HostListener('mouseover', ['$event'])
  mouseOver(evt: MouseEvent) {
    evt.stopPropagation();
    this.show();
  }

  @HostListener('mouseout', ['$event'])
  mouseOut(evt: MouseEvent) {
    const node = evt.relatedTarget as Node;
    if (
      this.parentOrSelf(this.elementRef.nativeElement, node) ||
      (this.popupRef && this.parentOrSelf(this.popupRef.element, node))
    ) {
      return;
    }
    this.close();
  }

  private parentOrSelf(target: Node, elem: Node) {
    let node = elem;
    while (node && node !== target) {
      node = node.parentNode;
    }
    return node === target;
  }

  private show() {
    if (this.isShown && PopoverDirective.activePopover === this) {
      clearTimeout(PopoverDirective.timerClose);
      return;
    }
    PopoverDirective.activePopover = this;
    this.isShown = true;

    clearTimeout(PopoverDirective.timerShow);
    PopoverDirective.timerShow = setTimeout(() => {
      this.popupRef = this.popup.open(this.lootiePopover, { name: 'cases-slider', anchor: this.elementRef.nativeElement });
      this.unsubscribe = this.renderer2.listen(this.popupRef.element, 'mouseout', e => this.mouseOut(e));
    }, 100);
  }

  private close() {
    clearTimeout(PopoverDirective.timerClose);
    PopoverDirective.timerClose = setTimeout(() => {
      this.isShown = false;
      if (this.popupRef) {
        this.popup.close();
        this.unsubscribe();
      }
    }, 1000);
  }
}
