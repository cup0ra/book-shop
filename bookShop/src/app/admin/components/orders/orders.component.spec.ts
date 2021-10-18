import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let orderServiceMock: any;

  beforeEach(() => {
    component = new OrdersComponent(orderServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
