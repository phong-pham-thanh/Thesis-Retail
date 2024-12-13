import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Inventory } from '../model/inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

    private apiGetAll = `${environment.apiBaseUrl}/Inventory/getAllInventory`;
  
  constructor(private http: HttpClient) { }

  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiGetAll, {withCredentials: true})
  }
}
