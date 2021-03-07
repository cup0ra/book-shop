/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickElementChangeFont]',
  host: {
    '(click)': 'onClick()',
  },
})
export class ClickElementChangeFontDirective {
  @Input() appClickElementChangeFont?: string;

  isSize = true;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  onClick() {
    this.isSize = !this.isSize;
    this.highlight(this.isSize ? '14px' : '16px', this.isSize ? null : 'red');
  }

  private highlight(size?: string, color?: string | null) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size', size);
    this.renderer2.setStyle(this.elementRef.nativeElement, 'color', color);
  }
}
