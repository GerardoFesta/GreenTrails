import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CamereService {

  private baseUrl= 'http://localhost:8080/api/camere';

  constructor(private http: HttpClient) { }

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
   
    
    return this.http.post<any>(`${this.baseUrl}`, params, {headers});
  }
}
