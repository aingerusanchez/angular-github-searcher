import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  #snackBar = inject(MatSnackBar);

  showError(message: string, buttonLabel?: string) {
    return this.#snackBar.open(message, buttonLabel);
  }

}
