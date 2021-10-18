import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let sut: AppComponent;
  let loadingServiceMock: any;

  beforeEach(() => {
    sut = new AppComponent(loadingServiceMock);
  });

  it('Create component', () => {
    expect(sut).toBeTruthy();
  });
});
