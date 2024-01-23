import { PrenotazioniService } from '../../../servizi/prenotazioni.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PopUpPrenotazioneComponent } from '../pop-up-prenotazione/pop-up-prenotazione.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {
  id: number = 0;
  arrivo1 = new FormControl();
  partenza1= new FormControl();
  numAdulti1= new FormControl();
  numBambini1= new FormControl();
  idItinerario: any;

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(private prenotazioniService: PrenotazioniService, private dialog: MatDialog) { }

  ngOnInit(): void {
     
    this.prenotazioniService.creaItinerari().subscribe((response) => {
      this.idItinerario = response.data.id;
});

    this.prenotazioniService.currentId.subscribe(id => {
      this.id = id;
  });
}

openPopupPrenotazione(message: string):void{
  const dialogRef = this.dialog.open(PopUpPrenotazioneComponent, {
    width: '250px',
    data: { message },
    disableClose: true,
  });

}

  onSubmit(){   
    const formData = {
      arrivo1: new Date(this.arrivo1.value).toISOString(),
      partenza1: new Date(this.partenza1.value).toISOString(),
      numAdulti: this.numAdulti1.value,
      numBambini1: this.numBambini1.value,      
      id: this.id,
      idItinerario: this.idItinerario.toString()
    };
    const timestampArrivo = new Date(this.arrivo1.value).getTime();
    const timestampPartenza = new Date(this.partenza1.value).getTime();

    this.prenotazioniService.prenotazioneAttivita(
      this.idItinerario,
      this.id,
      this.numAdulti1.value,
      this.numBambini1.value,
      timestampArrivo,
      timestampPartenza).subscribe(
      (response) =>{
        console.log('Dati inviati', response);
        if(response?.status ==='success'){
          this.openPopupPrenotazione('Prenotazione inviata');
        
        } else{
          this.openPopupPrenotazione('Prenotazione effettuata')
        }

      }
    )

//this.idItinerario, this.id, this.numAdulti1.value, this.numBambini1.value,this.arrivo1,this.partenza1

  }

  onClose(){
    this.prenotazioniService.cancellaItinerario(this.idItinerario).subscribe(
      (response) => {
        console.log('Itinerario cancellato con successo', response);
      },
      (error) => {
        console.error('Errore durante la cancellazione dell\'itinerario', error);
      }
    );

  }
}
