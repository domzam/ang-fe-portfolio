import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackbar = inject(MatSnackBar);

  openAsWarning(message: string) {
    this.snackbar.open(message, 'CLOSE', { panelClass: ['warning'], duration: 5_000 });
  }

}
