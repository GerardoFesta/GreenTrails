import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrazioneService {
 
  private url = 'http://localhost:8080/api/utenti';

  constructor(private http: HttpClient) {}

  registerUser(isGestore: boolean, dati: any, HttpHeaders = { }): Observable<any> {
    const urlWithParams = `${this.url}?isGestore=${isGestore}`;
    
    return this.http.put(urlWithParams, dati);
  }

}