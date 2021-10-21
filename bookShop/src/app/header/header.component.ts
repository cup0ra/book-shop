/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../auth/model/user';
import { CartService } from '../cart/services/cart.service';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { AuthService } from '../shared/services/auth/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  badge = 0;

  isAdmin = false;

  name: any;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.badge = this.cartService.getCartInfo().totalQuantity;
  }

  onLogin() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: this.isAdmin ? 'Exit' : 'login as admin',
        message: '',
        acceptButtonText: 'YES',
        declineButtonText: 'NO',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isAdmin = this.isAdmin ? !result : result;
    });
  }
}
