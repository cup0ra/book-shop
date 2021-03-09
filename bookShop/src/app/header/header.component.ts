/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../cart/services/cart.service';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { AuthService } from '../shared/services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements DoCheck {
  badge = 0;

  isAdmin = false;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngDoCheck() {
    this.badge = this.cartService.info.totalQuantity;
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
      console.log('The dialog was closed', result);
      this.isAdmin = this.isAdmin ? !result : result;
      !this.isAdmin ? this.authService.logout() : this.authService.login();
    });
  }
}
