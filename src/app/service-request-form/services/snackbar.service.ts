import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
   pass: String ='';
  constructor(private snackBar: MatSnackBar) { }

  validSnackBar(message: string, buttonText: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        buttonText: buttonText,
        pass: "Success"
      },
      duration:4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['validS']
    });
  }

  invalidSnackBar(message: string, buttonText: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        buttonText: buttonText,
        pass: "Error"
      },
      duration:4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['invalidS']
    });
  }
}
