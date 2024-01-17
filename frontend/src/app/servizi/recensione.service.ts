import { Attivita } from 'src/app/classi/attivita';
import { Recensione } from './../classi/recensione';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  private baseUrl = 'http://localhost:3000/recensioni';

  constructor(private http: HttpClient) { }

  visualizzaRecensioniPerAttivita(idAttivita: number): Observable<Recensione[]> {
    return this.http.get<Recensione[]>(`${this.baseUrl}/perAttivita/${idAttivita}`);
  }
}
