import { Recensione } from 'src/app/classi/recensione';
import { Attivita } from 'src/app/classi/attivita';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  private baseUrl = 'http://localhost:3000/recensioni';

  constructor(private http: HttpClient) { }

  // visualizzaRecensioniPerAttivita(idAttivita: number): Observable<Recensione[]> {
  //   return this.http.get<Recensione[]>(`${this.baseUrl}/perAttivita/${idAttivita}`);
  // }

  creaRecensione(
    idAttivita: number,
    valutazioneStelleEsperienza: number,
    descrizione: string,
    idValori: number
  ): Observable<Recensione> {
    const recensioneData = {
      idAttivita: idAttivita,
      valutazioneStelleEsperienza: valutazioneStelleEsperienza,
      descrizione: descrizione,
      idValori: idValori
    };
  
    return this.http.post<Recensione>(`${this.baseUrl}`, recensioneData);
  }
  //PRENDERE LE RISPOSTE DEL QUESTIONARIO
}
