import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoriEcosostenibilitaService {

  baseUrl: string = "http://localhost:8080/api/valori";

  constructor(private http: HttpClient, private cookie:CookieService) { }

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

      const headers = new HttpHeaders({
        Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
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

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });

    return this.http.post<any>(`${this.baseUrl}/${id}`, params, { headers });
  }

  visualizzaValoriById(idValori: number){
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    const url = `${this.baseUrl}/attivita/${idValori}/valoriEcosostenibilita`;
    return this.http.get(url, {headers});
    
  }
}