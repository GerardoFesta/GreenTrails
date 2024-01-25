import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttivitaServiceService {


  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  inserimento(politicheAntispreco: boolean, prodottiLocali: boolean,energiaVerde: boolean, raccoltaDifferenziata: boolean,
    limiteEmissioneCO2: boolean, contattoConNatura: boolean ): Observable<any> {

    const email = 'e@g.v';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );

    const params =new HttpParams()
    .set('politicheAntispreco', politicheAntispreco)
    .set('prodottiLocali', prodottiLocali)
    .set('energiaVerde', energiaVerde)
    .set('raccoltaDifferenziata', raccoltaDifferenziata)
    .set('limiteEmissioneCO2', limiteEmissioneCO2)
    .set('contattoConNatura', contattoConNatura)


   
    
    return this.http.post<any>(`${this.url}/api/valori`,params , {headers});

  }


  inserimentoAttivita(dati: any): Observable<any> {

    let params = new HttpParams();
  Object.keys(dati).forEach(key => {
    params = params.set(key, dati[key]);
  });



  const email = 'e@g.v';
  const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/attivita`, dati, {headers, params});

  }

  inserimentoCamere(idAlloggio: any, tipoCamera: string, disponibilita: any, 
    descrizione: string, capienza: any): Observable<any> {

      const params = new HttpParams()
      .set('idAlloggio', idAlloggio)
      .set('tipoCamera', tipoCamera)
      .set('disponibilita', disponibilita)
      .set('descrizione', descrizione)
      .set('capienza', capienza)
      

    

  const email = 'e@g.v';
  const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
   
    
    return this.http.post<any>(`${this.url}/api/camere`, params, {headers});
  }


}
