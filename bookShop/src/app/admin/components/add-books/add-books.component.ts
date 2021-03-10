import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Category, IBook } from 'src/app/books/models/book';
import { BooksService } from 'src/app/books/services/books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
})
export class AddBooksComponent implements OnInit {
  options: FormGroup;

  order: any = {};

  categorys = Category;

  book?: IBook;

  buttonName?: string;

  constructor(
    fb: FormBuilder,
    private location: Location,
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.book = this.booksService.getBook(id);

    this.options = fb.group({
      name: new FormControl(this.book?.name || ''),
      img: new FormControl(this.book?.img || ''),
      price: new FormControl(this.book?.price || ''),
      createDate: new FormControl(moment(this.book?.createDate).format() || moment()),
      isAvailable: new FormControl(this.book?.isAvailable || 'true'),
      description: new FormControl(this.book?.description || ''),
      category: new FormControl(this.book?.category || Category.Classics),
    });

    this.buttonName = this.book ? 'CHANGE BOOK' : 'ADD BOOK';
  }

  ngOnInit(): void {
    console.log('');
  }

  onSubmit() {
    this.order = {
      ...this.order,
      ...this.options.value,
      isAvailable: !this.options.controls.isAvailable.touched,
      id: this.book ? this.book.id : this.booksService.getBooks().value.length + 1,
      createDate: moment(this.options.controls.createDate.value).valueOf(),
    };
    if (this.book) {
      this.booksService.changeBook(this.order);
    } else {
      this.booksService.addBook(this.order);
    }
    console.log(this.order);
    this.router.navigate(['admin/products']);
  }

  backClicked() {
    this.location.back();
  }
}
