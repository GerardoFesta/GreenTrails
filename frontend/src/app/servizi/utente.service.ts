import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

 
private url = 'http://localhost:8080/api/utenti';

constructor(private http: HttpClient) {}

registerUser(isGestore: boolean, dati: any, HttpHeaders = { }): Observable<any> {
  const urlWithParams = `${this.url}?isGestore=${isGestore}`;
  
  return this.http.put(urlWithParams, dati);
}

login(email: String, password: String ): Observable<any> {
  
  const base64credential = btoa(email + ":" + password);
  const headers = ({Authorization: 'Basic ' + base64credential} );


  return this.http.get<any>(`${this.url}`, {headers});

}

}
