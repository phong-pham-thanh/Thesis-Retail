import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../model/customer.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private apiUrl = 'https://localhost:7030/Customer';

  constructor(private http: HttpClient) { }

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl)
  }
}
