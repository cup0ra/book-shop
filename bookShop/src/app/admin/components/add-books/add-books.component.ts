import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { Category, IBook } from 'src/app/books/models/book';
import { GeneratorService } from 'src/app/core/service/generator';
import { HttpClientService } from 'src/app/shared/services/http-client.service';
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

  buttonName? = 'ADD BOOK';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private booksService: HttpClientService<IBook>,
    private router: Router,
    private route: ActivatedRoute,
    private generatorId: GeneratorService,
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.booksService.getId('books', id).subscribe((book: any) => {
        this.book = book;
        this.options.patchValue({
          ...book,
          createDate: moment(book.createDate).format(),
          isAvailable: book.isAvailable.toString(),
        });
        this.buttonName = 'CHANGE BOOK';
      });

    this.options = fb.group({
      name: new FormControl(''),
      img: new FormControl(''),
      price: new FormControl(''),
      createDate: new FormControl(moment()),
      isAvailable: new FormControl('true'),
      description: new FormControl(''),
      category: new FormControl(Category.Classics),
    });
  }

  ngOnInit(): void {
    console.log(this.book);
  }

  onSubmit() {
    this.order = {
      ...this.order,
      ...this.options.value,
      isAvailable: !this.options.controls.isAvailable.touched,
      id: this.book ? this.book.id : this.generatorId.getRandomId(),
      createDate: moment(this.options.controls.createDate.value).valueOf(),
    };
    if (this.book) {
      this.booksService
        .put('books', this.order.id, this.order)
        .subscribe(() => this.router.navigate(['admin/products']));
    } else {
      this.booksService
        .post('books', this.order)
        .subscribe(() => this.router.navigate(['admin/products']));
    }
  }

  backClicked() {
    this.location.back();
  }
}
