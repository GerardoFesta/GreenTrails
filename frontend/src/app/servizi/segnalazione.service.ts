import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SegnalazioneService {

  private Url = "http://localhost:8080/api/valori";

  constructor(private http : HttpClient) { }

  getValoriEcosostenibilita() : Observable<any>{
    return this.http.get<any>(`${this.Url}/valori`);
  }

  mandaDatiSegnalazione(formData: any): Observable<any>{
    return this.http.post<any>(`${this.Url}/segnalazione`, formData);
  }

  getValoriEcosostenibilitaPerAttivita(attivitaId: number, idValori: number): Observable<any> {
    return this.http.get<any>(`${this.Url}/valori/${attivitaId}`);
  }
 
}
