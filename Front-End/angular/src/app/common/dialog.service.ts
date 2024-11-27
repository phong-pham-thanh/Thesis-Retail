import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, protected snackBar: MatSnackBar) { }


  showAlert(message: string, action: string = 'Đóng', duration: number = 3000, panelClass: string[] = ['custom-snackbar']) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: panelClass
    });
  }

  openConfirmDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: message },
      enterAnimationDuration: '0.3s',
      exitAnimationDuration: '0.3s'  
    });

    return dialogRef.afterClosed();
  }
}
