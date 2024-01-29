import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class AttivitaService {

  private baseUrl= 'http://localhost:8080/api/attivita';

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog ) { }

  visualizzaAttivita(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  visualizzaAttivitaPerPrezzo(limite: number): Observable<any> {
    const pararms = new HttpParams()
    .set('limite', limite.toString());

    console.log('Limite:', limite)

    return this.http.get<any>(`${this.baseUrl}/perPrezzo`);
  }


  getAlloggi(limite: number): Observable<any> {
    const pararms = new HttpParams()
    .set('limite', limite.toString());
    console.log('Limite:', limite)
    return this.http.get<any>(`${this.baseUrl}/alloggi`);}


  getAttivitaTuristiche(limite: number): Observable<any> {
    const pararms = new HttpParams()
    .set('limite', limite.toString());
    console.log('Limite:', limite)
    return this.http.get<any>(`${this.baseUrl}/attivitaTuristiche`);;
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`)
  }

  visualizzaAttivitaPerGestore(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
    
    return this.http.get<any>(`${this.baseUrl}`, {headers});
  }

  cancellaAttivita(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });

    return this.http.delete(`${this.baseUrl}/${id}`, {headers});
  }

  inserimentoAttivita(dati: any): Observable<any> {

    let params = new HttpParams();
  Object.keys(dati).forEach(key => {
    params = params.set(key, dati[key]);
  });
  const headers = new HttpHeaders({
    Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
  });
    return this.http.post<any>(`${this.baseUrl}`, dati, {headers, params});

  }

 
}