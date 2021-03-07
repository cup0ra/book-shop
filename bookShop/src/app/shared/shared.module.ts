import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by.pipe';
import { HoverCardDirective } from './directives/hover-card.directive';
import { ClickElementChangeFontDirective } from './directives/click-element-change-font.directive';

@NgModule({
  declarations: [OrderByPipe, HoverCardDirective, ClickElementChangeFontDirective],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrderByPipe,
    HoverCardDirective,
    ClickElementChangeFontDirective,
  ],
})
export class SharedModule {}
