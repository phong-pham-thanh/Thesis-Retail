import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(protected snackBar: MatSnackBar) { }


  showAlert(message: string, action: string = 'Đóng', duration: number = 3000, panelClass: string[] = ['custom-snackbar']) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass
    });
  }
}
