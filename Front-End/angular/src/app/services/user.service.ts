import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetAll = 'https://localhost:7030/User/getAllWithFullInfo';
  // private apiAdd = 'https://localhost:7030/Bill/addBill';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiGetAll)
  }

}
