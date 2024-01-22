import { PrenotazioniService } from './servizi/prenotazioni.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioniComponent } from './componenti/pagina-attivita/prenotazioni/prenotazioni.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(){
  }
}
