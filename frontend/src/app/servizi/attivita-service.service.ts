import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {


  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  inserimento( dati: any): Observable<any> {

    const email = 'visitatore@visitatore.it';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/valori`, dati, {headers});

  }
  inserimentoAttivita( dati: any): Observable<any> {

    const email = 'visitatore@visitatore.it';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/attivita`, dati, {headers});

  }

}
