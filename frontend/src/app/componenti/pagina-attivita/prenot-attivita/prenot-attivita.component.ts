import { PrenotazioniService } from '../../../servizi/prenotazioni.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PopUpPrenotazioneComponent } from '../pop-up-prenotazione/pop-up-prenotazione.component';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

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
  firstFormGroup: FormGroup;

  itineraryId: number | null;

  siClicked = false;
  creaClicked = false;
  azioneEseguita = false;
  
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
  });
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

this.itineraryId = this.prenotazioniService.getItineraryId();
    }

  ngOnInit(): void {
 
    this.prenotazioniService.currentId.subscribe(id => {
      this.id = id;
      console.log('ID attivita',id)

      this.idItinerario = localStorage.getItem('itineraryId');
  });
}

openPopupPrenotazione(message: string):void{
  const dialogRef = this.dialog.open(PopUpPrenotazioneComponent, {
    width: '250px',
    data: { message },
    disableClose: true,
  });

}



retrieveOrCreateItinerary() {
  this.itineraryId = this.prenotazioniService.getItineraryId();
  console.log(this.itineraryId)

  this.siClicked = false;
  this.creaClicked = true;
  this.azioneEseguita = true;
}

createNewItinerary() {
  this.itineraryId = this.prenotazioniService.generateNewId();
  console.log(this.itineraryId)
  this.siClicked = true;
  this.creaClicked = false;
  this.azioneEseguita = true;
}
 
deleteItinerary() {
  localStorage.removeItem(this.prenotazioniService.ITINERARY_KEY);
  this.itineraryId = null;
}


onVerifica(){
  const formData = {
    arrivo1:  this.formatDate(this.arrivo1.value),
    partenza1:  this.formatDate(this.partenza1.value),   
    idAttivita: this.id,
  };

  console.log(formData)

  this.prenotazioniService.verificaDisponibilita(
    this.id,
    this.partenza1.value,
    this.arrivo1.value).subscribe(
      (response) =>{
        console.log('Dati inviati', response);
      })
}

  onSubmit(){   

  }

  onClose(){

        console.log(this.arrivo1.value)
        console.log(this.partenza1.value)
        console.log(this.numAdulti1.value)
        console.log(this.numBambini1.value)

  }
}
