import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BooksRoutingModule } from './books-routing.module';

@NgModule({
  declarations: [...BooksRoutingModule.components],
  imports: [SharedModule, BooksRoutingModule],
})
export class BooksModule {}
