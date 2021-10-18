import { getTestBed, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientService } from './http-client.service';

/* jest.mock('@angular/common/http', () => {
  return {
    HttpParams: jest.fn().mockImplementation((params: any) => {
      return params;
    }),
    HttpHeaders: jest.fn().mockImplementation((header: any) => {
      return header;
    }),
  };
}); */

describe('HttpClientService', () => {
  let sut: HttpClientService<any>;
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let dataMock: any = [];
  const objMok = {
    id: 'lscrp25hy',
    name: 'Wuthering Heights',
    img: 'https://images-na.ssl-images-amazon.com/images/I/51QUauIPnmL._SX314_BO1,204,203,200_.jpg',
    description:
      'Emily Brontës only novel endures as a work of tremendous and far-reaching influence. The Penguin Classics edition is the definitive version of the text, edited with an introduction by Pauline Nestor.',
    price: 17.86,
    category: 'Classics',
    createDate: 1615487697936,
    isAvailable: true,
  };

  const objMokTest = {
    name: 'Wuthering Heights',
    img: 'https://images-na.ssl-images-amazon.com/images/I/51QUauIPnmL._SX314_BO1,204,203,200_.jpg',
    description:
      'Emily Brontës only novel endures as a work of tremendous and far-reaching influence. The Penguin Classics edition is the definitive version of the text, edited with an introduction by Pauline Nestor.',
    price: 20.86,
    category: 'Classics',
    createDate: 1615487697936,
    isAvailable: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService],
    });
    injector = getTestBed();
    sut = TestBed.get(HttpClientService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should be url', () => {
    expect(sut.url).toEqual('http://localhost:3000');
  });

  describe('#Get', () => {
    it('should return Observable<IBook[]>', () => {
      let booksMock;
      sut.get('books').subscribe((data) => {
        booksMock = data;
      });

      const req = httpMock.expectOne(`${sut.url}/books`);
      expect(req.request.method).toBe('GET');
      req.flush(dataMock);
      expect(booksMock).toMatchObject(dataMock);
    });

    it('should return Observable<IBook>', () => {
      let bookMock;
      sut.getId('books', objMok.id).subscribe((book) => {
        bookMock = book;
      });

      const req = httpMock.expectOne(`${sut.url}/books/${objMok.id}`);
      expect(req.request.method).toBe('GET');
      req.flush(objMok);
      expect(bookMock).toEqual(objMok);
    });

    /*     it('should return ERROR', () => {
      const status = 500;
      const statusText = 'Server error';
      const errorEvent = new ErrorEvent('API error');
      let actualError: HttpErrorResponse | undefined;
      sut.get('books').subscribe((error: any) => {
        actualError = error;
      });

      httpMock.expectOne(`${sut.url}/books`).error(errorEvent, { status, statusText });
      expect(actualError?.error).toBe(errorEvent);
      expect(actualError?.status).toBe(status);
      expect(actualError?.statusText).toBe(statusText);
    }); */
  });

  describe('#Post', () => {
    it('should return Observable<T>', () => {
      let response;
      sut.post('books', objMok).subscribe((books) => {
        response = books;
      });

      const req = httpMock.expectOne(`${sut.url}/books`);
      expect(req.request.method).toBe('POST');
      req.flush((dataMock = [...dataMock, objMok]));

      expect(response).toBe(dataMock);
    });
  });

  describe('#Put', () => {
    it('should return Observable<T>', () => {
      let response;
      sut.put('books', objMok.id, objMokTest).subscribe((book) => {
        response = book;
      });

      const req = httpMock.expectOne(`${sut.url}/books/${objMok.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(objMokTest);
      expect(response).toEqual(objMokTest);
    });
  });
  describe('#Delete', () => {
    it('should return Observable<T>', () => {
      let response;
      sut.delete('books', objMok.id).subscribe((books) => {
        response = books;
      });

      const req = httpMock.expectOne(`${sut.url}/books/${objMok.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush((dataMock = dataMock.filter((e: any) => e.id !== objMok.id)));
      expect(response).toEqual(dataMock);
    });
  });
});
