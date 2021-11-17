import { CartService } from './cart.service';

describe('Service cart', () => {
  let service: CartService;
  let httpClientMock: any;
  const cartInfoMock = {
    totalQuantity: 0,
    totalSum: 0,
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      getId: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    service = new CartService(httpClientMock);
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should get cart info', () => {
    expect(service.getCartInfo()).toEqual(cartInfoMock);
  });
});
