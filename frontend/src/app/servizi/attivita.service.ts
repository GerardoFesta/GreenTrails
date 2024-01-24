import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  private baseUrl= 'http://localhost:8080/api/attivita';

  constructor(private http: HttpClient, private cookie:CookieService) { }

  visualizzaAttivita(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookie.get('credenziali').replace(/"/g, '')
    });
    return this.http.get<any>(`${this.baseUrl}/${id}` , {headers});
  }

  visualizzaAttivitaPerPrezzo(limite: number): Observable<any> {
    const params = new HttpParams()
    .set('limite', limite.toString());

    console.log('Limite:', limite)

    return this.http.get<any>(`${this.baseUrl}/perPrezzo`, {params});
  }


  getAlloggi(limite: number): Observable<any> {
    const params = new HttpParams()
    .set('limite', limite.toString());
    console.log('Limite:', limite)
    return this.http.get<any>(`${this.baseUrl}/alloggi`,{params});}


  getAttivitaTuristiche(limite: number): Observable<any> {
    const params = new HttpParams()
    .set('limite', limite.toString());
    console.log('Limite:', limite)
    return this.http.get<any>(`${this.baseUrl}/attivitaTuristiche`, {params});
  }
}
