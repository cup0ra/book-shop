/* eslint-disable @angular-eslint/no-host-metadata-property */
import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { HOVER_SHADOW } from '../shared.constants';

@Directive({
  selector: '[appHoverCard]',
  host: {
    '(mouseover)': 'onMouseOver()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class HoverCardDirective implements AfterViewInit {
  @Input() appHoverCard?: string;

  boxShadow: string = HOVER_SHADOW;

  private initialColor?: string;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.initialColor = this.elementRef.nativeElement.style.boxShadow;
  }

  onMouseOver() {
    this.highlight(this.boxShadow);
  }

  onMouseLeave() {
    this.highlight(this.initialColor);
  }

  private highlight(shadow?: string) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'box-shadow', shadow);
  }
}
