import { DialogSettingsComponent } from './dialogSettings.component';

describe('DialogComponent', () => {
  let component: DialogSettingsComponent;
  let dataMock: any;
  let formBuilderMock: any;

  beforeEach(() => {
    component = new DialogSettingsComponent(dataMock, formBuilderMock);
  });

  it('should create DialogSettingsComponent', () => {
    expect(component).toBeTruthy();
  });
});
