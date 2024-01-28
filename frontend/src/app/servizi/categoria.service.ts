import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl= 'http://localhost:8080/api/categorie';

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  aggiungiCategoria(idAttivita: any, id: any): Observable<any> {

      const params = new HttpParams()
      .set('idAttivita', idAttivita)
      .set('id', id)

      
      const headers = new HttpHeaders({
        Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
      });
    
    return this.http.post<any>(`${this.baseUrl}/${id}`, params, {headers});
  }
}
