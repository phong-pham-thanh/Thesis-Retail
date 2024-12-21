import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {

  private barcode = '';
  private timeout: any;

  constructor() {}

  handleKeyPress(event: KeyboardEvent, callback: (barcode: string) => void) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (event.key === 'Enter') {
      if (this.barcode) {
        callback(this.barcode);
        this.barcode = '';
      }
    } else {
      this.barcode += event.key;
      this.timeout = setTimeout(() => {
        this.barcode = '';
      }, 100);
    }
  }
}
