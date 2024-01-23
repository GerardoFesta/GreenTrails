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
  firstFormGroup: FormGroup;

  idItinerario: any | null;

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

this.idItinerario = this.prenotazioniService.getidItinerario();
    }

ngOnInit(): void {
    this.idItinerario = localStorage.getItem('idItinerario');    
 
    this.prenotazioniService.currentId.subscribe(id => {
      this.id = id;
      console.log('ID attivita',id)

      this.idItinerario = localStorage.getItem('idItinerario');
  });
}

openPopupPrenotazione(message: string):void{
  const dialogRef = this.dialog.open(PopUpPrenotazioneComponent, {
    width: '250px',
    data: { message },
    disableClose: true,
  });

}

aggiungiAllItinerario() {
  console.log(this.idItinerario)

  this.siClicked = false;
  this.creaClicked = true;
  this.azioneEseguita = true;
}

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
 
deleteItinerary() {
  localStorage.removeItem(this.prenotazioniService.ITINERARY_KEY);
  this.idItinerario = null;
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

    const formData = {
      arrivo1: this.formatDate(this.firstFormGroup.get('arrivo1')?.value),
      partenza1: this.formatDate(this.firstFormGroup.get('partenza1')?.value),
      numAdulti1: this.firstFormGroup.get('numAdulti1')?.value,
      numBambini1: this.firstFormGroup.get('numBambini1')?.value,
      id: this.id,
      idItinerario: this.idItinerario
    }
    console.log(formData)
    const timestampArrivo = new Date(this.firstFormGroup.get('arrivo1')?.value).getTime();
    const timestampPartenza = new Date(this.firstFormGroup.get('partenza1')?.value).getTime();
    
    console.log(this.idItinerario)
    console.log(this.id)
    console.log(this.firstFormGroup.get('numAdulti1')?.value);
    console.log(this.firstFormGroup.get('numBambini1')?.value)
    console.log(timestampPartenza)
    console.log(timestampArrivo)


    this.prenotazioniService.prenotazioneAttivita(
      this.idItinerario, 
      this.id,
      this.firstFormGroup.get('numAdulti1')?.value,
      this.firstFormGroup.get('numBambini1')?.value,
      timestampArrivo,
      timestampPartenza
      ).subscribe(
      (response) =>{
        console.log('Dati inviati', response);
        if(response?.status ==='success'){
          this.openPopupPrenotazione('Prenotazione inviata');
        
        } else{
          this.openPopupPrenotazione('Prenotazione effettuata')
        }
  })
}

  onClose(){

        console.log(this.arrivo1.value)
        console.log(this.partenza1.value)
        console.log(this.numAdulti1.value)
        console.log(this.numBambini1.value)

  }
}
