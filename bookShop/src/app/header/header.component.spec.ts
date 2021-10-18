import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let cartServiceMock: any;
  let dialogMock: any;
  let authServiceMock: any;

  beforeEach(() => {
    component = new HeaderComponent(cartServiceMock, dialogMock, authServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
