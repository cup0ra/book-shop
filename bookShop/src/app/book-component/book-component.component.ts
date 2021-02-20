import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBookModel } from '../book';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent implements OnInit {
  @Input() book!: IBookModel;

  @Output() changeTitle = new EventEmitter<any>();

  title: any = '111';

  ngOnInit(): void {
    console.log('init');
  }

  addBookCard(): void {
    this.changeTitle.emit(this.book);
  }
}
