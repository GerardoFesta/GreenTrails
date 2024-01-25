import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prenotazione } from '../componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniAttivitaTuristicheService {

  private baseUrl = 'http//localhost:8080/api/prenotazioni-attivita-turistica'

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getPrenotazioniAttivitaTuristicaVisitatore(idVisitatore: string): Observable<Prenotazione[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    const url = `${this.baseUrl}?idVisitatore=${idVisitatore}`;
    return this.http.get<Prenotazione[]>(url, {headers});
  }

  deletePrenotazioneAttivitaTuristica (idPrenotazione: number) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    const url = `${this.baseUrl}/${idPrenotazione}`;
    return this.http.delete<void>(url, {headers});
  }
}
