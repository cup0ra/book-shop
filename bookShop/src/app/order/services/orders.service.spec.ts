import { of } from 'rxjs';
import { Category } from 'src/app/books/models/book';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpClientMock: any;
  const order = {
    name: 'Алла Бороненкова',
    street: 'Уборевича',
    home: '130',
    flat: '57',
    phone: +375298785451,
    comment: 'nty',
    payment: 'cash',
    product: [
      {
        id: '7edyuwcbp',
        name: 'JavaScript Bible',
        img:
          'https://img.thriftbooks.com/api/images/m/71d8fee5fb90bc1801e2efd0e337ab38d4e7ab8f.jpg',
        description:
          'JavaScript(tm) Bible 3rd Edition Survey of third-party authoring tools included! If JavaScript can do it, you can do it too ... Create Web pages brimming with interactive content. Integrate Java applets without taxing your server. Deploy Dynamic HTML applications. With the expert advice of todays premier JavaScript authority and teacher, youll quickly find out how to leverage the full power of JavaScript. With characteristic clarity and precision, Danny Goodman offers beginning to advanced tutorials covering all aspects of JavaScript -- plus an extensive JavaScript object and language reference. ',
        price: 4.69,
        category: Category.Training,
        createDate: 1615487697936,
        isAvailable: true,
        quantity: 1,
      },
    ],
    id: 'h1fcuy5nt5',
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn().mockImplementation(() => of([order])),
      post: jest.fn().mockImplementation(() => of(order)),
    };

    service = new OrdersService(httpClientMock);
  });

  it('should be created OrdersService', () => {
    expect(service).toBeTruthy();
  });

  it('should GET call getOrder', () => {
    const spy = jest.spyOn(service, 'getOrders');
    let result;
    service.getOrders().subscribe((data) => {
      result = data;
    });
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual([order]);
    spy.mockRestore();
  });

  it('should POST call addOrder', () => {
    const spy = jest.spyOn(service, 'addOrder');
    let result;
    service.addOrder(order).subscribe((data) => {
      result = data;
    });
    expect(spy).toHaveBeenCalled();
    expect(result).toEqual(order);
    spy.mockRestore();
  });
});
