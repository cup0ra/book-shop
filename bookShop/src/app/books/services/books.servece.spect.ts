import { BooksService } from './books.service';

describe('Books service', () => {
  let service: BooksService;
  let booksHttpMock: any;
  const books = [
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

  beforeEach(() => {
    booksHttpMock = {
      get: jest.fn(),
      getId: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    service = new BooksService(booksHttpMock);
  });

  it('shout create service', () => {
    expect(service).toBeTruthy();
  });

  it('Get books should return []', () => {
    expect(service.getBooks()).toEqual(service.books);
  });

  it('Get book should return book', () => {
    expect(service.getBook('xb6jchv2y')).toEqual(books[0]);
  });
});
