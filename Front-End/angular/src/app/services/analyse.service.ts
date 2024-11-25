import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DateParam, GoodNoteAnalyse } from '../model/analyse.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {

  private apiGetAllReceiptAnalyse = `${environment.apiBaseUrl}/Analyse/goodReceipt`;
  private apiGetAllExportAnalyse = `${environment.apiBaseUrl}/Analyse/goodExport`;

  constructor(private http: HttpClient) { }

  getProductReceipt(dateRange: DateParam) :Observable<GoodNoteAnalyse[]> {
    return this.http.post<GoodNoteAnalyse[]>(`${this.apiGetAllReceiptAnalyse}`, dateRange);
  }

  getProductExport(dateRange: DateParam) :Observable<GoodNoteAnalyse[]> {
    return this.http.post<GoodNoteAnalyse[]>(`${this.apiGetAllExportAnalyse}`, dateRange);
  }
}
