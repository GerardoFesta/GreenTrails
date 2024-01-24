import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {


  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  inserimento( dati: any): Observable<any> {

    const email = 'e@g.v';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/valori`, dati, {headers});

  }


  inserimentoAttivita(dati: any): Observable<any> {

    let params = new HttpParams();
  Object.keys(dati).forEach(key => {
    params = params.set(key, dati[key]);
  });



  const email = 'e@g.v';
  const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/attivita`, dati, {headers, params});

  }

}
