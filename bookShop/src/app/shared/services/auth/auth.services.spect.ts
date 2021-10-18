import { AuthService } from './auth.services';

describe('AuthService', () => {
  let service: AuthService;
  let routeMock: any;

  beforeEach(() => {
    routeMock = {
      navigate: jest.fn(),
    };

    service = new AuthService(routeMock);
    service.isloggedIn = false;
  });

  it('Create service', () => {
    expect(service).toBeTruthy();
  });

  it('IsloggedIn should false', () => {
    expect(service.isloggedIn).toBeFalsy();
  });

  it('GetloggedIn should return false', () => {
    expect(service.getloggedIn()).toEqual(false);
  });
});
