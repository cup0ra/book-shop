import { of } from 'rxjs';
import { Category } from '../../models/book';
import { BookComponentComponent } from './book-component.component';

describe('BookComponentComponent', () => {
  let component: BookComponentComponent;
  let matSnackBarMock: any;
  let routeMock: any;
  let cardServiceMock: any;
  let booksServiceMock: any;
  let loadingServiceServiceMock: any;
  const book = {
    id: 'xb6jchv2y',
    name: 'Pro React 16',
    img: 'https://images-na.ssl-images-amazon.com/images/I/41W9YdrRslL._SX348_BO1,204,203,200_.jpg',
    description:
      'Use the enormously popular React framework to build dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. You will learn how React brings the power of strong architecture and responsive data to the client, providing the foundation for complex and rich user interfaces.',
    price: 37.86,
    category: Category.Training,
    createDate: 1615487697936,
    isAvailable: true,
  };

  beforeEach(() => {
    loadingServiceServiceMock = {
      isLoading$: jest.fn(),
    };

    matSnackBarMock = {
      open: jest.fn(),
    };

    routeMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue(1),
        },
      },
    };

    booksServiceMock = {
      getBook: jest.fn().mockImplementation(() => of(book)),
    };

    cardServiceMock = {
      addBookCart: jest.fn().mockImplementation(() => matSnackBarMock.open()),
    };

    component = new BookComponentComponent(
      matSnackBarMock,
      routeMock,
      cardServiceMock,
      booksServiceMock,
      loadingServiceServiceMock,
    );
    component.message = `Book added in cart`;
    component.actionButtonLabel = 'Retry';
    component.action = false;
    component.autoHide = 2000;
    component.horizontalPosition = 'center';
    component.verticalPosition = 'top';

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get book should', () => {
    expect(component.book).toEqual(book);
  });

  it('action should be false', () => {
    expect(component.action).toBeFalsy();
  });
  it('message should be `Book added in cart`', () => {
    expect(component.message).toEqual(`Book added in cart`);
  });
  it('actionButtonLabel should be `Retry`', () => {
    expect(component.actionButtonLabel).toEqual('Retry');
  });
  it('autoHide should be 2000', () => {
    expect(component.autoHide).toEqual(2000);
  });
  it('horizontalPosition should be `center`', () => {
    expect(component.horizontalPosition).toEqual('center');
  });
  it('verticalPosition should be `top`', () => {
    expect(component.verticalPosition).toEqual('top');
  });

  it('Add books', () => {
    const spy = jest.spyOn(cardServiceMock, 'addBookCart');
    cardServiceMock.addBookCart.mockImplementation(() => of(matSnackBarMock.open()));
    component.addBook();
    expect(spy).toHaveBeenCalled();
  });
});
