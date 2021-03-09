import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { EditProductResolver } from './guards/resolve-edit.guard';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [...AdminRoutingModule.components, OrdersComponent],
  imports: [SharedModule, AdminRoutingModule],
  providers: [EditProductResolver],
})
export class AdminModule {}
