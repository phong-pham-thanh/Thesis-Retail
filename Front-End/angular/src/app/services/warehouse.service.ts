import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Warehouse } from '../model/warehouse.model';
@Injectable({
  providedIn: 'root'
})
export class WarehouseService {


  private apiUrl = 'https://localhost:7030/Warehouse';

  constructor(private http: HttpClient) { }

  getAllWarehouse(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrl)
  }
}
