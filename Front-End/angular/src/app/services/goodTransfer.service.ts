import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoodTransfer } from '../model/goodTransfer.model';

@Injectable({
  providedIn: 'root'
})
export class GoodTransferService {
  private apiGetAll = 'https://localhost:7030/GoodTransfer';
  private apiAdd= 'https://localhost:7030/GoodTransfer/addGoodTransfer';
  private apiAccept = 'https://localhost:7030/GoodTransfer/acceptGoodTransfer';


  constructor(private http: HttpClient) {}

  getAllGoodTransfer(){
    return this.http.get<GoodTransfer[]>(this.apiGetAll)
  }

  addNewGoodTransfer(goodTransfer: GoodTransfer){
    return this.http.post<GoodTransfer>(this.apiAdd, goodTransfer)
  }

  acceptGoodTransfer(id: number){
    return this.http.get<GoodTransfer>(`${this.apiAccept}/${id}`)
  }
}
