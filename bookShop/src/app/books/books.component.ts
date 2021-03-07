import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../services/books.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private booksService: BooksService,
  ) {}

  ngOnInit(): void {
    this.books = this.booksService.getBooks();
  }
}
