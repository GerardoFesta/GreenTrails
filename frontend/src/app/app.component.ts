import { PrenotazioniService } from './servizi/prenotazioni.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioniComponent } from './componenti/prenotazioni/prenotazioni.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';


  
  constructor(public dialog: MatDialog, private PrenotazioniService: PrenotazioniService){

  
  }

  openDialog() {
    this.PrenotazioniService.apriDialog();
    
  }

  // Add a method to set the category
  setCategory(categoria: string) {
    this.PrenotazioniService.categoria = categoria;
  }
}
