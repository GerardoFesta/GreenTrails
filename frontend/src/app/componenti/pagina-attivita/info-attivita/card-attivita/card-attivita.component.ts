import { Attivita } from 'src/app/classi/attivita';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupsegnalazioneComponent } from 'src/app/componenti/popupsegnalazione/popupsegnalazione.component';

@Component({
  selector: 'app-card-attivita',
  templateUrl: './card-attivita.component.html',
  styleUrls: ['./card-attivita.component.css']
})
export class CardAttivitaComponent implements OnInit {

  @Input() attivita?: Attivita;

  immagine_attivita: string = 'https://www.hotelkennedy.org/static/f9f7a02b44b26255144bc1b4086fbd1e/5267c/e825f4c8-e7d7-4693-9895-b012d2879684.jpg';

  mostraPopup: boolean = false;

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  apriSegnalazione(): void{
    const dialogRef = this.dialog.open(PopupsegnalazioneComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog chiuso:', result);
      // Puoi gestire i dati restituiti dal dialogo qui, se necessario
    });
  }

  chiudiFormPopup(): void{
    this.mostraPopup = false;
  }

  handleFormSubmitted(): void {
    //logica per gestire l'invio del form
    console.log('Form inviato con successo!');
  }
}