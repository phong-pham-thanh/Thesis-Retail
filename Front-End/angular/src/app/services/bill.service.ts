import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bill } from '../model/bill.model';
@Injectable({
  providedIn: 'root'
})
export class BillService {


  private apiAdd = 'https://localhost:7030/Bill/addBill';

  constructor(private http: HttpClient) { }

  addNewBill(param: Bill): Observable<boolean> {
    return this.http.post<boolean>(this.apiAdd, param)
  }
}
