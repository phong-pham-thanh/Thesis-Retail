import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceProduct } from '../model/price.model';

@Injectable({
    providedIn: 'root'
})

export class PriceProductService {

    protected baseUrl: string;
  
    constructor(protected http: HttpClient) {
        this.baseUrl = "https://localhost:7030/PriceProduct"
    }

    getAllPriceProduct(): Observable<PriceProduct[]> {
        return this.http.get<PriceProduct[]>(this.baseUrl);
    }
  
}