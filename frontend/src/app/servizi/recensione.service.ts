import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  private baseUrl = 'http://localhost:8080/api/recensioni';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  visualizzaRecensioniPerAttivita(idAttivita: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/perAttivita/${idAttivita}`);
  }

  creaRecensione(idAttivita: number, valutazioneStelleEsperienza: number, descrizione: string, idValori: number, immagine: FileList): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('idAttivita', idAttivita.toString())
    formData.append('valutazioneStelleEsperienza', valutazioneStelleEsperienza.toString())
    formData.append('descrizione', descrizione)
    formData.append('idValori', idValori.toString())

    if(immagine != null)
    {Array.from(immagine).forEach((file, index) => {
      formData.append('immagine', immagine[index], immagine[index].name);
      console.log('name: ', file.name);
      console.log('size: ', file.size);
      console.log('type: ', file.type);
    })}
    
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });

    console.log("idAttivita: " + idAttivita);
    console.log("valutazioneStelleEsperienza: " + valutazioneStelleEsperienza);
    console.log("descrizione: " + descrizione);
    console.log("idValori: " + idValori);
    return this.http.post<any>(`${this.baseUrl}`, formData, { headers });
  }
  

  visualizzaRecensione(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
