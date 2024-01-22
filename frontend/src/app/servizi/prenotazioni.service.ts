import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PoliticheEcosostenibiliAttivitaComponent } from '../componenti/pagina-attivita/info-attivita/politiche-ecosostenibili-attivita/politiche-ecosostenibili-attivita.component';
import { BehaviorSubject } from 'rxjs';
import { PrenotAttivitaComponent } from '../componenti/pagina-attivita/prenot-attivita/prenot-attivita.component';
import { PrenotazioniComponent } from '../componenti/pagina-attivita/prenotazioni/prenotazioni.component';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  categoria: string = 'attivita'; // Default category

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080';

  getCamereDisponibili(id: number): Observable<any>{

    return this.http.get<any[]>(`${this.baseUrl}/api/camere/perAlloggio/${id}`);

  }

  getItinerariUtente(): Observable<any[]>{
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
    return this.http.get<any[]>(`${this.baseUrl}/api/itinerari`,  {headers});
  }


  apriDialogAlloggio() {
    const dialogRef =
      
      this.dialog.open(PrenotazioniComponent, { width: '60%' })


    dialogRef.afterClosed().subscribe((risultato) => {
      console.log(`Dialog chiuso con risultato: ${risultato}`);
    });
  }

  apriDialogAttivita() {
    const dialogRef =
      
      this.dialog.open(PrenotAttivitaComponent, { width: '60%' })


    dialogRef.afterClosed().subscribe((risultato) => {
      console.log(`Dialog chiuso con risultato: ${risultato}`);
    });
  }

  private idSource = new BehaviorSubject<number>(0);
  currentId = this.idSource.asObservable();

  changeId(id: number) {
    this.idSource.next(id);
  }

  prenotazioneAttivita(idItinerario: number, idAttivita: number,numAdulti: number, numBambini: number, dataInizio: any, dataFine: any  ): Observable<any>{
  
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );


    const timestampInizio = new Date(dataInizio).getTime();
    const timestampFine = new Date(dataFine).getTime();

    const params = new HttpParams()
    .set('idItinerario', idItinerario)
    .set('idAttivita', idAttivita)
    .set('numAdulti', (numAdulti).toString())
    .set('numBambini', (numBambini).toString())
       .set('dataInizio', timestampInizio.toString())
      .set('dataFine', timestampFine.toString());


    return this.http.post(`${this.baseUrl}/api/prenotazioni-attivita-turistica`,params, {headers});
  }

  prenotazioneAlloggio(idItinerario: number,idCamera: number, idAttivita: number,numAdulti: number, numBambini: number, numCamere: number, dataInizio: any, dataFine: any  ): Observable<any>{
  
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );


    const timestampInizio = new Date(dataInizio).getTime();
    const timestampFine = new Date(dataFine).getTime();

    const params = new HttpParams()
    .set('idItinerario', idItinerario)
    .set('idAttivita', idAttivita)
    .set('numAdulti', (numAdulti).toString())
    .set('numBambini', (numBambini).toString())
       .set('dataInizio', timestampInizio.toString())
      .set('dataFine', timestampFine.toString())
      .set('idCamera', (idCamera).toString()  )
      .set('numCamere', (numCamere).toString()  );


    return this.http.post(`${this.baseUrl}/api/prenotazioni-alloggio`,params, {headers});
  }

  creaItinerari(): Observable<any>{
    const email = 'e@g.b';
    const password = 'qwerty123!';
    const base64credential = btoa(email + ":" + password);
    const headers = ({Authorization: 'Basic ' + base64credential} );
    return this.http.post(`${this.baseUrl}/api/itinerari`,{},  {headers});
  }
  
}
