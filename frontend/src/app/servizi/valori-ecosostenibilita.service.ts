import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoriEcosostenibilitaService {

  baseUrl: string = "http://localhost:8080/api/valori";

  constructor(private http: HttpClient) { }

  creaValoriEcosostenibilitaVisitatore(politicheAntispreco: boolean, prodottiLocali: boolean,
    energiaVerde: boolean, raccoltaDifferenziata: boolean,
    limiteEmissioneCO2: boolean, contattoConNatura: boolean): Observable<any> {

    const params = new HttpParams()
      .set('politicheAntispreco', politicheAntispreco)
      .set('prodottiLocali', prodottiLocali)
      .set('energiaVerde', energiaVerde)
      .set('raccoltaDifferenziata', raccoltaDifferenziata)
      .set('limiteEmissioneCO2', limiteEmissioneCO2)
      .set('contattoConNatura', contattoConNatura);

    const email = 'visitatore@visitatore.it';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64credential
    });

    return this.http.post<any>(`${this.baseUrl}`, params, { headers });
  }

  modificaValoriEcosostenibilita(id: number, politicheAntispreco: boolean, prodottiLocali: boolean,
    energiaVerde: boolean, raccoltaDifferenziata: boolean,
    limiteEmissioneCO2: boolean, contattoConNatura: boolean): Observable<any> {

    const params = new HttpParams()
      .set('politicheAntispreco', politicheAntispreco)
      .set('prodottiLocali', prodottiLocali)
      .set('energiaVerde', energiaVerde)
      .set('raccoltaDifferenziata', raccoltaDifferenziata)
      .set('limiteEmissioneCO2', limiteEmissioneCO2)
      .set('contattoConNatura', contattoConNatura);

    const email = 'visitatore@visitatore.it';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64credential
    });

    return this.http.post<any>(`${this.baseUrl}/${id}`, params, { headers });
  }
}