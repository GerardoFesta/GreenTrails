import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PrenotazioniAttivitaComponent } from '../componenti/pagina-attivita/prenotazioni-attivita/prenotazioni-attivita.component';
import { PrenotazioniComponent } from '../componenti/pagina-attivita/prenotazioni/prenotazioni.component';

@Injectable({
  providedIn: 'root'
})
export class ItinerariService {

  ITINERARY_KEY = 'itineraryId';
  categoria: string = 'attivita'; // Default category

  constructor(private dialog: MatDialog,private http: HttpClient, private cookieService: CookieService) {}

  private baseUrl = 'http://localhost:8080';

  private idSource = new BehaviorSubject<number>(0);
  currentId = this.idSource.asObservable();

  changeId(id: number) {
    this.idSource.next(id);
  }


  
  cancellaItinerario(idItinerario: number): Observable<any> {
      
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
    return this.http.delete(`${this.baseUrl}/api/itinerari/${idItinerario}`,{headers});
  }


  creaItinerari(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
    return this.http.post(`${this.baseUrl}/api/itinerari`,{},  {headers});
  }
  


  getidItinerario(): number |null {
    const storedId = localStorage.getItem(this.ITINERARY_KEY);

    if (storedId) {
      return +storedId;
    } else {
      return null;
    }
  }

  getItinerariUtente(): Observable<any[]>{
    
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + this.cookieService.get('credenziali').replace(/"/g, '')
    });
    return this.http.get<any[]>(`${this.baseUrl}`,  {headers});
  }

  
}
