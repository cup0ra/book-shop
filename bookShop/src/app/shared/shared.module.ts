import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderByPipe } from './pipes/order-by.pipe';
import { HoverCardDirective } from './directives/hover-card.directive';
import { ClickElementChangeFontDirective } from './directives/click-element-change-font.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    OrderByPipe,
    HoverCardDirective,
    ClickElementChangeFontDirective,
    DialogComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    OrderByPipe,
    HoverCardDirective,
    ClickElementChangeFontDirective,
    SpinnerComponent,
  ],
})
export class SharedModule {}
