import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from '../model/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiSetSession = 'https://localhost:7030/User/setSession';

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {}

  getUserFromCookie(): any {

    const userCookieValue = this.cookieService.get('user');
    if (userCookieValue) {
      try {
        return JSON.parse(userCookieValue);
      } catch (error) {
        console.error('Failed to parse cookie value', error);
      }
    } else {
      console.log('No user cookie found');
      return;
    }
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    return;
  }

  setSession(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiSetSession}/${id}`);
  }

  checkAuthAndRedirect(): void {
    const user = this.getUserFromCookie();
    if (!user || !user.id) {
      this.router.navigate(['/login']);
    } else {
      this.setSession(user.id).subscribe();
    }
  }
}
