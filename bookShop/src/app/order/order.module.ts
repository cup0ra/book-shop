import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order.component';
import { OrderFormComponent } from './order-form/order-form.component';

@NgModule({
  declarations: [OrderComponent, OrderFormComponent],
  imports: [SharedModule],
})
export class OrderModule {}
