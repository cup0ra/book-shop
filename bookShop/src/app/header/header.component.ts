/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CartService } from '../cart/services/cart.service';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  badge = 0;

  isAdmin = false;

  name: string;

  constructor(private cartService: CartService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.badge = this.cartService.getCartInfo().totalQuantity;
  }

  onLogin(): void {
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
