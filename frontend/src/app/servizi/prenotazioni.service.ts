import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrenotAttivitaComponent } from '../componenti/prenot-attivita/prenot-attivita.component';
import { PrenotazioniComponent } from '../componenti/prenotazioni/prenotazioni.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  categoria: string = 'Attivita'; // Default category

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api/v1/greentrails';


  isAlloggio(userData: any): Observable<any> {
    return this.http.get(`${this.baseUrl}`, userData);
  }





  apriDialog() {
    const dialogRef =
      this.categoria === 'Alloggio'
        ? this.dialog.open(PrenotazioniComponent, { width: '60%' })
        : this.dialog.open(PrenotAttivitaComponent, { width: '60%' });

    dialogRef.afterClosed().subscribe((risultato) => {
      console.log(`Dialog chiuso con risultato: ${risultato}`);
    });
  }
}
