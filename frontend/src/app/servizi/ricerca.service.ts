import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicercaService {

  baseUrl: string = 'http://localhost:8080/api/ricerca';

  constructor(private http: HttpClient) { }

  cerca(latitudine: number, longitudine: number, raggio: number): Observable<any> {
    const params: any = { 
      coordinate: { x: latitudine, y: longitudine },
      raggio: raggio
    };

    return this.http.post(this.baseUrl, params);
  }
}