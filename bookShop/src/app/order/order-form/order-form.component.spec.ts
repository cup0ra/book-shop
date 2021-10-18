import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fb: any;
  let cartServiceMock: any;
  let locationMock: any;
  let orderServicesMock: any;
  let generatorMock: any;

  beforeEach(() => {
    component = new OrderFormComponent(
      fb,
      cartServiceMock,
      locationMock,
      orderServicesMock,
      generatorMock,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
