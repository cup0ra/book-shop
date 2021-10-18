import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let optionsMock: any;

  beforeEach(() => {
    component = new DialogComponent(optionsMock);
  });

  it('should create DialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
