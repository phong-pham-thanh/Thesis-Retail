import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodTransferService {


  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get("api_links.product.getAll.url");
  }

  getAllCustomers(): Observable<any> {
    return this.http.get("api_links.customer.getAll.url");
  }

  getAllWarehouses(): Observable<any> {
    return this.http.get("api_links.warehouse.getAll.url");
  }

  getAllCategories(): Observable<any> {
    return this.http.get("api_links.category.getAll.url");
  }

  postGoodsIssue(postData: any): Observable<any> {
    return this.http.post("api_links.goodsIssue.export.createNew.url", postData);
  }
}
