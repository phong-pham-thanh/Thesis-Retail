import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodTransfer } from '../model/goodTransfer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoodTransferService {
  private apiGetAll = `${environment.apiBaseUrl}/GoodTransfer/getAllGoodTransferByRole`;
  private apiAdd= `${environment.apiBaseUrl}/GoodTransfer/addGoodTransfer`;
  private apiAccept = `${environment.apiBaseUrl}/GoodTransfer/acceptGoodTransfer`;
  private apiDelete = `${environment.apiBaseUrl}/GoodTransfer/deleteItem`;
  private apiGetById = `${environment.apiBaseUrl}/GoodTransfer/getGoodTransferById`;
  private apiUpdate = `${environment.apiBaseUrl}/GoodTransfer/updateGoodTransfer`;
  private apiCancel = `${environment.apiBaseUrl}/GoodTransfer/cancelGoodTransfer`;
  private apiDownload = `${environment.apiBaseUrl}/GoodTransfer/download`;


  constructor(private http: HttpClient) {}

  getAllGoodTransfer(){
    return this.http.get<GoodTransfer[]>(this.apiGetAll, {withCredentials: true})
  }

  addNewGoodTransfer(goodTransfer: GoodTransfer){
    return this.http.post<GoodTransfer>(this.apiAdd, goodTransfer, {withCredentials: true})
  }

  acceptGoodTransfer(id: number){
    return this.http.get<GoodTransfer>(`${this.apiAccept}/${id}`, {withCredentials: true})
  }

  deleteGoodTransfer(id: number){
    return this.http.get<boolean>(`${this.apiDelete}/${id}`, {withCredentials: true})
  }

  cancelGoodTransfer(id: number){
    return this.http.get<GoodTransfer>(`${this.apiCancel}/${id}`, {withCredentials: true})
  }
  
  getByIdGoodTransfer(id: number){
    return this.http.get<GoodTransfer>(`${this.apiGetById}/${id}`, {withCredentials: true})
  }
  
  updateGoodTransfer(goodTransfer: GoodTransfer){
    return this.http.post<GoodTransfer>(`${this.apiUpdate}/${goodTransfer.id}`, goodTransfer, {withCredentials: true})
  }

  downloadFile(id: number) {
    return this.http.get(`${this.apiDownload}/${id}`, { responseType: 'blob' }); // Lấy file dưới dạng Blob
  }
}
