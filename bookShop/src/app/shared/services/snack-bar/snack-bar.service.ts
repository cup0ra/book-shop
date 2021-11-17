import { Injectable } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBarConfig,
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public message = '';

  public actionButtonLabel = 'Retry';

  public action = false;

  public autoHide = 2000;

  public horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  public verticalPosition: MatSnackBarVerticalPosition = 'top';

  public config = new MatSnackBarConfig();

  constructor(public snackBar: MatSnackBar) {
    this.config.verticalPosition = this.verticalPosition;
    this.config.horizontalPosition = this.horizontalPosition;
    this.config.duration = this.autoHide;
  }

  open(message: string): void {
    this.snackBar.open(
      (this.message = message),
      this.action ? this.actionButtonLabel : undefined,
      this.config,
    );
  }
}
