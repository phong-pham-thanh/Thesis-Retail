import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Warehouse } from '../model/warehouse.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WarehouseService {


  private apiUrlGetAll = `${environment.apiBaseUrl}/Warehouse/`;
  private apiUrlGetAllByRole = `${environment.apiBaseUrl}/Warehouse/getAllByRole`;

  constructor(private http: HttpClient) { }

  getAllWarehouse(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrlGetAll, {withCredentials: true})
  }

  getAllWarehouseByRole(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUrlGetAllByRole, {withCredentials: true})
  }
}
