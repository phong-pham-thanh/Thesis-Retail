import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceProduct } from '../model/price.model';

@Injectable({
    providedIn: 'root'
})

export class PriceProductService {

    protected loadAll: string;
    protected addNew: string;
    protected update: string;
    protected delete: string;
  
    constructor(protected http: HttpClient) {
        this.loadAll = "https://localhost:7030/PriceProduct"
        this.addNew = "https://localhost:7030/PriceProduct/addNew"
        this.update = "https://localhost:7030/PriceProduct/update"
        this.delete = "https://localhost:7030/PriceProduct/delete"
    }

    getAllPriceProduct(): Observable<PriceProduct[]> {
        return this.http.get<PriceProduct[]>(this.loadAll);
    }

    addNewItem(newItem: PriceProduct): Observable<PriceProduct> {
        return this.http.post<PriceProduct>(this.addNew, newItem);
    }
    
    updateItem(newItem: PriceProduct): Observable<PriceProduct> {
        return this.http.put<PriceProduct>(this.update + '/' + newItem.id, newItem);
    }
    
    deleteItem(newItem: PriceProduct): Observable<boolean> {
        return this.http.delete<boolean>(this.delete + '/' + newItem.id);
    }
}