import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, IBook, ICart } from './models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Book';

  cart: any = [];

  books: IBook = {
    id: 0,
    name: 'Switch: How to Change Things When Change Is Hard',
    img: 'https://images-na.ssl-images-amazon.com/images/I/41pfm3UZ7ZL._SX346_BO1,204,203,200_.jpg',
    description:
      'The primary obstacle is a conflict that’s built into our brains, say Chip and Dan Heath, authors of the critically acclaimed bestseller Made to Stick. Psychologists have discovered that our minds are ruled by two different systems—the rational mind and the emotional mind—that compete for control. The rational mind wants a great beach body; the emotional mind wants that Oreo cookie. The rational mind wants to change something at work; the emotional mind loves the comfort of the existing routine. This tension can doom a change effort—but if it is overcome, change can come quickly.',
    price: 100,
    category: Category.Classics,
    createDate: Date.now(),
    isAvailable: true,
  };

  constructor(private route: ActivatedRoute) {}

  addBookCart(value: IBook): void {
    this.cart = this.cart.length
      ? this.cart.reduce(
          (a: ICart[], b: ICart) =>
            b && b.id === value.id ? [...a, { ...b, quantity: b.quantity + 1 }] : [...a, b],
          [],
        )
      : [...this.cart, { ...value, quantity: 1 }];
    console.log(this.cart);
  }
}
