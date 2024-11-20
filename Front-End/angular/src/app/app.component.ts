import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) {
    this.sessionLoaded = false;

  }
  sessionLoaded = false;

  ngOnInit() {
    this.initializeSession();
  }

  initializeSession() {
    const user = this.authService.getUserFromCookie();
  
    if (user && user.id) {
      this.authService.setSession(user.id).subscribe(
        (result) => {
          this.cookieService.set('user', JSON.stringify(result), { path: '/' });
          this.sessionLoaded = true;
        },
        (error) => {
          console.error("Session setup failed:", error);
          this.router.navigate(['/login']);
          this.sessionLoaded = true;
        }
      );
    } else {
      this.router.navigate(['/login']);
      this.sessionLoaded = true;
    }
  }
}
