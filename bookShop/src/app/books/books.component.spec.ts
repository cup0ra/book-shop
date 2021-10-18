import { BooksComponent } from './books.component';
import { Category, IBook } from './models/book';

describe('BooksComponent', () => {
  let sut: BooksComponent;
  let booksServiceMock: any;
  const books: IBook[] = [
    {
      id: 'xb6jchv2y',
      name: 'Pro React 16',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/41W9YdrRslL._SX348_BO1,204,203,200_.jpg',
      description:
        'Use the enormously popular React framework to build dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. You will learn how React brings the power of strong architecture and responsive data to the client, providing the foundation for complex and rich user interfaces.',
      price: 37.86,
      category: Category.Training,
      createDate: 1615487697936,
      isAvailable: true,
    },
  ];

  beforeEach(() => {
    booksServiceMock = {
      getBooks: jest.fn().mockReturnValue(books),
    };
    sut = new BooksComponent(booksServiceMock);
    sut.ngOnInit();
  });

  it('should create', () => {
    expect(sut).toBeTruthy();
  });
  it('Get books should', () => {
    expect(sut.books).toEqual(books);
  });
});
