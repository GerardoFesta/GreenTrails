import { PrenotazioniService } from '../../../servizi/prenotazioni.service';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpPrenotazioneComponent } from '../pop-up-prenotazione/pop-up-prenotazione.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {
 
  idAttivita: number = 0;
  arrivo1 = new FormControl();
  partenza1= new FormControl();
  numAdulti1= new FormControl();
  numBambini1= new FormControl();
  firstFormGroup: FormGroup;

  idItinerario: any | null;
  disponibilita: any;
  isDisponibile: boolean = false;

  siClicked = false;
  creaClicked = false;
  azioneEseguita = false;

  
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',});
  isOptional = false;

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(private prenotazioniService: PrenotazioniService, private dialog: MatDialog, private _formBuilder: FormBuilder) {
this.firstFormGroup = this._formBuilder.group({
  arrivo1: ['', Validators.required],
  partenza1: ['', Validators.required],
  numAdulti1: ['', Validators.required],
  numBambini1: ['', Validators.required]
});
this.idItinerario = this.prenotazioniService.getidItinerario();
    }

ngOnInit(): void {
    this.idItinerario = localStorage.getItem('idItinerario');    
    this.prenotazioniService.currentId.subscribe(id => {
      this.idAttivita = id;
      this.idItinerario = localStorage.getItem('idItinerario');
  });
}

//POP-UP CONFERMA/EROORE
openPopupPrenotazione(message: string):void{
  const dialogRef = this.dialog.open(PopUpPrenotazioneComponent, {
    width: '250px',
    data: { message },
    disableClose: true,
  });

}

//AGGIUNGI ATTIVITA ALL'ITINERARIO
aggiungiAllItinerario() {
  this.siClicked = false;
  this.creaClicked = true;
  this.azioneEseguita = true;
}

// CREAZIONE ITINERARIO
creaItinerario() {
  this.prenotazioniService.creaItinerari().subscribe((response) => {
    const idItinerario = response.data.id;
    localStorage.setItem('idItinerario', idItinerario.toString());
    this.idItinerario = idItinerario;
    this.siClicked = false;
    this.creaClicked = true;
    this.azioneEseguita = true;
  });
}

//VERIFICA DISPONIBILITA
verificaDisponibilita() {
  const formData = {
    arrivo1: this.formatDate(this.firstFormGroup.get('arrivo1')?.value),
    partenza1: this.formatDate(this.firstFormGroup.get('partenza1')?.value), 
    idAttivita: this.idAttivita,
  };

  this.prenotazioniService.verificaDisponibilitaAttivita(
        this.idAttivita,
    formData.arrivo1,
    formData.partenza1).subscribe(
      (response) =>{
        this.disponibilita = this.firstFormGroup.get('numAdulti1')?.value + this.firstFormGroup.get('numBambini1')?.value < response.data? 'Disponibile' : 'Non disponibile';
        this.isDisponibile = this.firstFormGroup.get('numAdulti1')?.value + this.firstFormGroup.get('numBambini1')?.value < response.data? true : false;

      })
}
 // INVIO DEI DATI
  onSubmit(){   

    const formData = {
      arrivo1: this.formatDate(this.firstFormGroup.get('arrivo1')?.value),
      partenza1: this.formatDate(this.firstFormGroup.get('partenza1')?.value),
      numAdulti1: this.firstFormGroup.get('numAdulti1')?.value,
      numBambini1: this.firstFormGroup.get('numBambini1')?.value,
      id: this.idAttivita,
      idItinerario: this.idItinerario
    }

    this.prenotazioniService.prenotazioneAttivita(
      this.idItinerario, 
      this.idAttivita,
      this.firstFormGroup.get('numAdulti1')?.value,
      this.firstFormGroup.get('numBambini1')?.value,
     formData.arrivo1,
    formData.partenza1
      ).subscribe(
      (response) =>{
        if (response?.status === 'success') {
          this.openPopupPrenotazione('Prenotazione inviata');
        } else {
          const errorMessage = response?.error?.message || 'Errore sconosciuto';
          this.openPopupPrenotazione(errorMessage);
        }
      },
      (error) => {
        this.openPopupPrenotazione(error.error.data);
      }
    );
}

}
