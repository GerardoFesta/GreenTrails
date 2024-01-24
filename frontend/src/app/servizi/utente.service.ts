import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {
private isLogged: boolean = false;
 
private url = 'http://localhost:8080/api/utenti';

constructor(private http: HttpClient, private cookieService: CookieService) {}

registerUser(isGestore: boolean, dati: any, HttpHeaders = { }): Observable<any> {
  const urlWithParams = `${this.url}?isGestore=${isGestore}`;
  return this.http.put(urlWithParams, dati);
}

login(email: string, password: string): Observable<any> {
  const base64credential = btoa(email + ':' + password);
  const headers = { Authorization: 'Basic ' + base64credential };

  return this.http.get<any>(`${this.url}`, { headers }).pipe(
    tap((response) => {
      this.isLogged = true;
      console.log('Login successful:', response);

      this.cookieService.set('user', JSON.stringify(response.data));
      this.cookieService.set('credenziali', JSON.stringify(base64credential));
      this.cookieService.set('userId', (response.data.id));
      this.cookieService.set('email', (response.data.email));
      this.cookieService.set('password', (response.data.password));

    }),
    catchError((error) => {
      console.error('Error during login:', error);
      throw error;
    })
  );
}

logout(): Observable<any> {
  this.isLogged = false;

  this.cookieService.delete('user');

  return of({ success: true });
}
isLoggedInUser(): boolean {
  // Check if the user is logged in by verifying the presence of the 'user' cookie
  return this.isLogged || this.cookieService.check('user');
}
getUserInfo(): any {
  // Retrieve user information from the 'user' cookie
  const userData = this.cookieService.get('user');
  return userData ? JSON.parse(userData) : null;
}
}
