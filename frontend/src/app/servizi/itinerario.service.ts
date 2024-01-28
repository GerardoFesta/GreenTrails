import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  

  private url = 'http://localhost:8080/api/itinerari';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  generaItinerario():Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
  
    return this.http.post<any>(`${this.url}/genera`, {headers});
  }
  getItinerario(id: number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
  
    return this.http.post<any>(`${this.url}/${id}`, {headers});
  }
  
  deleteItinerario(id: number):Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
  
    return this.http.post<any>(`${this.url}/${id}`, {headers});
  }
  }