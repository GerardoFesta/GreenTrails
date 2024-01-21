import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioniComponent } from '../componenti/pagina-attivita/info-attivita/politiche-ecosostenibili-attivita/prenotazioni/prenotazioni.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PoliticheEcosostenibiliAttivitaComponent } from '../componenti/pagina-attivita/info-attivita/politiche-ecosostenibili-attivita/politiche-ecosostenibili-attivita.component';
import { BehaviorSubject } from 'rxjs';
import { PrenotAttivitaComponent } from '../componenti/pagina-attivita/prenot-attivita/prenot-attivita.component';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  categoria: string = 'Attivita'; // Default category

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080';

  apriDialog() {
    const dialogRef =
      this.categoria === 'Alloggio'
        ? this.dialog.open(PrenotazioniComponent, { width: '60%' })
        : this.dialog.open(PrenotAttivitaComponent, { width: '60%' });

    dialogRef.afterClosed().subscribe((risultato) => {
      console.log(`Dialog chiuso con risultato: ${risultato}`);
    });
  }

  private idSource = new BehaviorSubject<number>(0);
  currentId = this.idSource.asObservable();

  changeId(id: number) {
    this.idSource.next(id);
  }

  prenotazione(idItinerario: number, idAttivita: number,numAdulti: any, numBambini: any, dataInizio: any, dataFine: any  ): Observable<any>{
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );

    const params = new HttpParams()
    .set('idItinerario', idItinerario.toString())
    .set('idAttivita', idAttivita.toString())
    .set('numAdulti', numAdulti)
    .set('numBambini', numBambini)
    .set('dataInizio', dataInizio)
    .set('dataFine', dataFine);
    return this.http.post(`${this.baseUrl}/api/prenotazioni-attivita-turistica`,params, {headers});
  }

  creaItinerari(): Observable<any>{
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
    return this.http.post(`${this.baseUrl}/api/itinerari`,{},  {headers});
  }
}
