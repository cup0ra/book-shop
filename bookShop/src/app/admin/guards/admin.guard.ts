/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AuthService } from 'src/app/shared/services/auth/auth.services';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private location: Location,
    private authService: AuthService,
    public dialog: MatDialog,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.authService.getloggedIn()) {
      this.openDialog();
      return false;
    }
    return true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: 'You are not allowed to view this page. You are redirected to login Page',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.location.path(true);
    });
  }
}
