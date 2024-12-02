import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BillMonthAnalyse, DateParam, GoodNoteAnalyse, PriceProductAnalyse } from '../model/analyse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  private apiGetAllReceiptAnalyse = `${environment.apiBaseUrl}/Analyse/goodReceipt`;
  private apiGetAllExportAnalyse = `${environment.apiBaseUrl}/Analyse/goodExport`;
  private apiGetAllBillByMonthAnalyse = `${environment.apiBaseUrl}/Analyse/billByMonth`;
  private apiGetAllPriceProductAnalyse = `${environment.apiBaseUrl}/Analyse/priceProdctAnalyse`;

  constructor(private http: HttpClient) { }

  getProductReceipt(dateRange: DateParam) :Observable<GoodNoteAnalyse[]> {
    return this.http.post<GoodNoteAnalyse[]>(`${this.apiGetAllReceiptAnalyse}`, dateRange);
  }

  getProductExport(dateRange: DateParam) :Observable<GoodNoteAnalyse[]> {
    return this.http.post<GoodNoteAnalyse[]>(`${this.apiGetAllExportAnalyse}`, dateRange);
  }

  getBillByMonth(dateRange: DateParam) :Observable<BillMonthAnalyse[]> {
    return this.http.post<BillMonthAnalyse[]>(`${this.apiGetAllBillByMonthAnalyse}`, dateRange);
  }

  getPriceProductAnalyse(productId: number) :Observable<PriceProductAnalyse[]> {
    return this.http.get<PriceProductAnalyse[]>(`${this.apiGetAllPriceProductAnalyse}/${productId}`)
  }
}