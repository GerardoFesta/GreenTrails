import { InserimentoAttivitaService } from './servizi/inserimento-attivita.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  

  
  constructor(public dialog: MatDialog, private InserimentoAttivitaService: InserimentoAttivitaService){

  
  }

  openDialog() {
    this.InserimentoAttivitaService.apriDialog();
  }

}
