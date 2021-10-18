import { AddBooksComponent } from './add-books.component';

describe('AddBooksComponent', () => {
  let component: AddBooksComponent;
  let fbMock: any;
  let locationMock: any;
  let booksServiceMock: any;
  let routerMock: any;
  let routeMock: any;

  beforeEach(() => {
    component = new AddBooksComponent(
      fbMock,
      locationMock,
      booksServiceMock,
      routerMock,
      routeMock,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
