import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClientService } from 'src/app/shared/services/http-client/http-client.service';

import { Category, IBook } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly booksSource = new BehaviorSubject<IBook[]>([]);

  public books: Observable<IBook[]> = this.booksSource.asObservable();

  public q = [
    {
      name: 'Pro React 16',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/41W9YdrRslL._SX348_BO1,204,203,200_.jpg',
      description:
        'Use the enormously popular React framework to build dynamic JavaScript applications that take advantage of the capabilities of modern browsers and devices. You will learn how React brings the power of strong architecture and responsive data to the client, providing the foundation for complex and rich user interfaces.',
      price: 37,
      category: Category.Training,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'JavaScript and JQuery : Interactive Front-End Web Development',
      img: 'https://img.thriftbooks.com/api/images/m/daed4f53240a9f02dcaf9d5fd2a6b920788f327e.jpg',
      description:
        'Table of ContentsIntroduction to AngularRequirements to develop Angular ApplicationsCreating and Running an applicationOpening Angular Application in Visual Studio CodeStructure of Angular ApplicationData BindingEvent BindingDesigning an input form with text controlngIf DirectivengFor DirectiveForm Validation using ValidatorsPipesCreating',
      price: 24,
      category: Category.Horror,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'Wuthering Heights',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/51QUauIPnmL._SX314_BO1,204,203,200_.jpg',
      description:
        'Emily Brontës only novel endures as a work of tremendous and far-reaching influence. The Penguin Classics edition is the definitive version of the text, edited with an introduction by Pauline Nestor.',
      price: 17,
      category: Category.Classics,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'HTML5 and CSS3 All-in-One For Dummies 3rd Edition',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/51Y6d3fIpyL._SX397_BO1,204,203,200_.jpg',
      description:
        'HTML5 and CSS3 are essential tools for creating dynamic websites and boast updates and enhanced features that can make your websites even more effective and unique. This friendly, all-in-one guide covers everything you need to know about each of these technologies and their latest versions so that you can use them together. Building on the bestselling formats of the first two editions, this new edition teaches you the fundamentals of HTML5 and CSS3, and then presents ways for using them with JavaScript, MySQL, and Ajax to create websites that work.',
      price: 16,
      category: Category.Classics,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'ANGULAR: Learn to build Web Applications',
      img:
        'https://img.thriftbooks.com/api/images/i/m/D44A494E1E0A0FCDB738012096C26E138B090617.jpg',
      description:
        'Table of ContentsIntroduction to AngularRequirements to develop Angular ApplicationsCreating and Running an applicationOpening Angular Application in Visual Studio CodeStructure of Angular ApplicationData BindingEvent BindingDesigning an input form with text controlngIf DirectivengFor DirectiveForm Validation using ValidatorsPipesCreating new ComponentRoutingCreating Login FormThis book is a step-by-step guide to learn angular programming to develop dynamic mobile and web applications.This book follows a practical approach to teach angular. ',
      price: 15,
      category: Category.Fantasy,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'JavaScript',
      img: 'https://img.thriftbooks.com/api/images/m/e11d7b0e4ecb8316c897b269be540fa4eea2f60e.jpg',
      description:
        'This Fifth Edition is completely revised and expanded to cover JavaScript as it is used in todays Web 2.0 applications. This book is both an example-driven programmers guide and a keep-on-your-desk reference, with new chapters that explain everything you need to know to get the most out of JavaScript, including: Scripted HTTP and Ajax XML processing Client-side graphics using the canvas tag Namespaces in JavaScript--essential when writing complex programs Classes, closures, persistence, Flash, and JavaScript embedded in Java applications Part I explains the core JavaScript language in detail. If you are new to JavaScript, it will teach you the language. If you are already a JavaScript programmer, Part I will sharpen your skills and deepen your understanding of the language.',
      price: 5,
      category: Category.Horror,
      createDate: 1614546000000,
      isAvailable: true,
    },
    {
      name: 'JavaScript Bible',
      img: 'https://img.thriftbooks.com/api/images/m/71d8fee5fb90bc1801e2efd0e337ab38d4e7ab8f.jpg',
      description:
        'JavaScript(tm) Bible 3rd Edition Survey of third-party authoring tools included! If JavaScript can do it, you can do it too ... Create Web pages brimming with interactive content. Integrate Java applets without taxing your server. Deploy Dynamic HTML applications. With the expert advice of todays premier JavaScript authority and teacher, youll quickly find out how to leverage the full power of JavaScript. With characteristic clarity and precision, Danny Goodman offers beginning to advanced tutorials covering all aspects of JavaScript -- plus an extensive JavaScript object and language reference. ',
      price: 4,
      category: Category.Training,
      createDate: 1615487697936,
      isAvailable: true,
    },
    {
      name: 'Saint X: A Novel Kindle Edition',
      img: 'https://m.media-amazon.com/images/I/51pMrW0+vcL.jpg',
      price: 13,
      createDate: 1615831333923,
      isAvailable: true,
      description:
        "\"'Saint X' is hypnotic. Schaitkin's characters...are so intelligent and distinctive it feels not just easy, but necessary, to follow them. I devoured [it] in a day.\"",
      category: Category.Classics,
    },
    {
      name: 'Who is Maud Dixon?: A Novel',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/41TL9WxdZQL._SX322_BO1,204,203,200_.jpg',
      price: 19,
      createDate: 1615912792000,
      isAvailable: true,
      description:
        "Florence Darrow is a low-level publishing employee who believes that she's destined to be a famous writer. When she stumbles into a job the assistant to the brilliant, enigmatic novelist known as Maud Dixon — whose true identity is a secret — it appears that the universe is finally providing Florence’s big chance.",
      category: Category.Training,
    },
  ];

  constructor(private booksHttp: HttpClientService<IBook>) {
    this.initBooks();
  }

  initBooks = (): void => {
    /*   this.q.forEach((item: any) => {
      this.booksHttp
        .post('books', { ...item, id: undefined })
        .subscribe((data) => console.log(data));
    }); */
    this.booksHttp.get('books').subscribe((books) => {
      this.booksSource.next(books);
    });
  };

  getBooks = (): Observable<IBook[]> => this.booksSource;

  getBook(id: string): Observable<IBook> {
    return this.booksHttp.getId('books', id);
  }

  addBook(obj: IBook): Observable<IBook> {
    return this.booksHttp.post('books', obj).pipe(
      tap((data) => {
        this.booksSource.next([...this.booksSource.getValue(), data]);
        console.log(data);
      }),
    );
  }

  changeBook(obj: IBook): Observable<IBook> {
    return this.booksHttp.put('books', obj.id, obj).pipe(
      tap((data: any) => {
        this.booksSource.next([
          ...this.booksSource.getValue().filter((e: IBook) => e.id !== data.id),
          data,
        ]);
      }),
    );
  }
}
