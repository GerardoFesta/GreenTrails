import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  private baseUrl= 'http://localhost:8080/api/attivita';

  constructor(private http: HttpClient) { }

  

  visualizzaAttivita(id: number): Observable<any> {
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );

    return this.http.get<any>(`${this.baseUrl}/${id}`,{headers});
  }

  findAllAttivita(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all`);
  }
}