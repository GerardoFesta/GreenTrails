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

  
  constructor(public dialog: MatDialog){

  
  }
  openDialog(){

    this.dialog.open(PrenotazioniComponent,{width:'50%'});


  }
  
}
