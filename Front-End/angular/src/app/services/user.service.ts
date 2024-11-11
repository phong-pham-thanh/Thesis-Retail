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
  private apiUpdate = 'https://localhost:7030/User/update';
  private apiAdd = 'https://localhost:7030/User/add';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiGetAll)
  }

  updateUser(user: Users){
    return this.http.put<Users>(`${this.apiUpdate}/${user.id}`, user)
  }

  addNewUser(user: Users){
    return this.http.post<Users>(`${this.apiAdd}`, user)
  }

}
