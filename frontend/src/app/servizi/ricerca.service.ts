import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RicercaService {

  baseUrl: string = 'http://localhost:8080/api/ricerca';

  constructor(private http: HttpClient) { }

  cerca(query: string, idCategorie?: number[], coordinate?: any, raggio?: number): Observable<any> {
    const params: any = {query: query}
    if(idCategorie) {
      params.idCategorie = idCategorie
    }
    if(coordinate) {
      params.coordinate = coordinate
    }
    if(raggio) {
      params.raggio = raggio
    }

    return this.http.post(this.baseUrl, params)
  }
}