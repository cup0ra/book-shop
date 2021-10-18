import { CartItemComponentComponent } from './cart-item-component.component';

describe('CartItemComponentComponent', () => {
  let component: CartItemComponentComponent;
  let cartServiceMock: any;

  beforeEach(() => {
    component = new CartItemComponentComponent(cartServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
