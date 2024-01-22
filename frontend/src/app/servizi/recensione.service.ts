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

  creaRecensione(idAttivita: number, valutazioneStelleEsperienza: number, descrizione: string, idValori: number, immagine: FileList): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('idAttivita', idAttivita.toString())
    formData.append('valutazioneStelleEsperienza', valutazioneStelleEsperienza.toString())
    formData.append('descrizione', descrizione)
    formData.append('idValori', idValori.toString())

    Array.from(immagine).forEach((file, index) => {
      formData.append('immagine', immagine[index], immagine[index].name);
      console.log('name: ', file.name);
      console.log('size: ', file.size);
      console.log('type: ', file.type);
    })

    const email = 'visitatore@visitatore.com';
    const password = 'visitatore123@';
    const base64credential = btoa(email + ":" + password);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64credential,
    });

    console.log("idAttivita: " + idAttivita);
    console.log("valutazioneStelleEsperienza: " + valutazioneStelleEsperienza);
    console.log("descrizione: " + descrizione);
    console.log("idValori: " + idValori);
    return this.http.post<any>(`${this.baseUrl}`, formData, { headers });
  }

}
