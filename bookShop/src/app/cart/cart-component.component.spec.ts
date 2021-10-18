import { CartComponentComponent } from './cart-component.component';

describe('CartComponentComponent', () => {
  let component: CartComponentComponent;
  let cartServiceMock: any;

  beforeEach(() => {
    component = new CartComponentComponent(cartServiceMock);
  });

  it('should create CartComponentComponent', () => {
    expect(component).toBeTruthy();
  });
});
