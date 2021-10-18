import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;

  beforeEach(async () => {
    component = new AdminComponent();
  });

  it('shout create component', () => {
    expect(component).toBeTruthy();
  });
});
