import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bill } from '../model/bill.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BillService {


  private apiGetAll = `${environment.apiBaseUrl}/Bill/getAllByRole`;
  private apiAdd = `${environment.apiBaseUrl}/Bill/addBill`;
  private apiDownload = `${environment.apiBaseUrl}/Bill/download`;

  constructor(private http: HttpClient) { }

  getAllBill(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.apiGetAll, {withCredentials: true})
  }

  addNewBill(param: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.apiAdd, param, {withCredentials: true})
  }

  downloadFile(id: number) {
    return this.http.get(`${this.apiDownload}/${id}`, { responseType: 'blob' }); // Lấy file dưới dạng Blob
  }
}
