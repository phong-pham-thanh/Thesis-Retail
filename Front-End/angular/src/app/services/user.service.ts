import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../model/user.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiGetAll = `${environment.apiBaseUrl}/User/getAllWithFullInfo`;
  private apiGetById = `${environment.apiBaseUrl}/User/getById`;
  private apiUpdate = `${environment.apiBaseUrl}/User/update`;
  private apiAdd = `${environment.apiBaseUrl}/User/add`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiGetAll)
  }

  getCurrentuser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiGetById}/${id}`);
  }

  updateUser(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUpdate}/${user.id}`, user)
  }

  addNewUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiAdd}`, user)
  }

}
