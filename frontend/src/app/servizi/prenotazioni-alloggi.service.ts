import { CookieService } from 'ngx-cookie-service';
import { Prenotazione } from './../componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniAlloggiService {

  private baseUrl = 'http://localhost:8080/api/prenotazioni-alloggio' 

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getPrenotazioniAlloggioVisitatore(idVisitatore: string): Observable<Prenotazione[]> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    const url = `${this.baseUrl}?idVisitatore=${idVisitatore}`;
    return this.http.get<Prenotazione[]>(url, {headers});
  }

  deletePrenotazioneAlloggio(idPrenotazione: number){
    const headers = new HttpHeaders ({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    })
    const url = `${this.baseUrl}/${idPrenotazione}`;
    return this.http.delete<void>(url, {headers});
  }
}
