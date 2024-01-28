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

login(email: String, password: String ): Observable<any> {

  const base64credential = btoa(email + ":" + password);
  const headers = ({Authorization: 'Basic ' + base64credential} );


  return this.http.get<any>(`${this.url}`, { headers }).pipe(
    tap((response) => {
      this.isLogged = true;
      console.log('Login successful:', response);

      // Save user data in a cookie
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

  const allCookies = this.cookieService.getAll();
    
    for (const cookieName in allCookies) {
      if (allCookies.hasOwnProperty(cookieName)) {
        this.cookieService.delete(cookieName);
      }
    }

    return of({ success: true });
  

}

isLoggedInUser(): boolean {
  return this.isLogged;
}

}

