import { of } from 'rxjs';
import { BooksListComponentComponent } from './books-list-component.component';

describe('BooksListComponentComponent', () => {
  let sut: BooksListComponentComponent;
  let booksServiceMock: any;
  let authServiceMock: any;
  let loadingServiceMock: any;
  const booksMock = [
    {
      id: 'xb6jchv2y',
      name: 'Pro React 16',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/41W9YdrRslL._SX348_BO1,204,203,200_.jpg',
      description:
        'Use the enormously popular React framework to build dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. You will learn how React brings the power of strong architecture and responsive data to the client, providing the foundation for complex and rich user interfaces.',
      price: 37.86,
      category: 'Training',
      createDate: 1615487697936,
      isAvailable: true,
    },
  ];

  beforeEach(async () => {
    booksServiceMock = {
      getBooks: jest.fn().mockImplementation(() => of(booksMock)),
    };

    authServiceMock = {
      getloggedIn: jest.fn().mockReturnValue(true),
    };

    sut = new BooksListComponentComponent(booksServiceMock, authServiceMock, loadingServiceMock);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });

  it('should get books', () => {
    expect(sut.books).toEqual(booksMock);
  });

  it('should get isAdmin', () => {
    expect(sut.isAdmin).toBeTruthy();
  });

  it('should set style height 87%', () => {
    expect(sut.style).toBe('87%');
  });
  it('should set style height 100%', () => {
    expect(sut.style).toBe('100%');
  });

  it('Should changed isSortField', () => {
    sut.isSortField = true;
    expect(sut.isSortField).toBeTruthy();
    sut.sort();
    expect(sut.isSortField).toBeFalsy();
    sut.sort();
    expect(sut.isSortField).toBeTruthy();
  });

  it('Should set sortField', () => {
    const event: any = {
      target: { value: 'name' },
    };
    sut.selectSort(event);
    expect(sut.sortField).toBe('name');
  });
});
