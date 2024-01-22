import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  private baseUrl = 'http://localhost:8080/api/recensioni';

  constructor(private http: HttpClient) { }

  visualizzaRecensioniPerAttivita(idAttivita: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/perAttivita/${idAttivita}`);
  }

  creaRecensione(idAttivita: number, valutazioneStelleEsperienza: number, descrizione: string, idValori: number): Observable<any> {
    const params = new HttpParams()
      .set('idAttivita', idAttivita.toString())
      .set('valutazioneStelleEsperienza', valutazioneStelleEsperienza.toString())
      .set('descrizione', descrizione)
      .set('idValori', idValori);

    const email = 'visitatore@visitatore.it';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64credential
    });

    console.log("idAttivita: " + idAttivita);
    console.log("valutazioneStelleEsperienza: " + valutazioneStelleEsperienza);
    console.log("descrizione: " + descrizione);
    console.log("idValori: " + idValori);
    return this.http.post<any>(`${this.baseUrl}`, params, { headers });
  }

}
