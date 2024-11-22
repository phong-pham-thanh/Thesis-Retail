import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/product.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = `${environment.apiBaseUrl}/Product`;

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }
}
