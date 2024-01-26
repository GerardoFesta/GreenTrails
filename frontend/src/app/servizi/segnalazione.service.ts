import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SegnalazioneService {

  private Url = "http://localhost:8080/api/segnalazioni";

  constructor(private http : HttpClient, private cookie: CookieService) { }

  mandaDatiSegnalazione(idAttivita: number, descrizione: string, idValori: number): Observable<any>{
    const formData: FormData = new FormData();
    const dataSegnalazione = new Date().toISOString();
    formData.append('dataSegnalazione', dataSegnalazione);
    
    formData.append('descrizione', descrizione.toString());
    formData.append('isForRecensione', 'false');
    
    formData.append('idAttivita', idAttivita.toString())
    formData.append('idValori', idValori.toString())




    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    return this.http.post<any>(`${this.Url}`, formData, {headers});
  }
 
}
