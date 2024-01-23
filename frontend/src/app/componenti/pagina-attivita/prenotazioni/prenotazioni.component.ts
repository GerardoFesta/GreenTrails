import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioniService } from 'src/app/servizi/prenotazioni.service';
import { PopUpPrenotazioneComponent } from '../pop-up-prenotazione/pop-up-prenotazione.component';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})

export class PrenotazioniComponent implements OnInit {

  camereOptions: { id: number, tipoCamera: string }[] = [];
id: number = 0;
arrivo = new FormControl();
partenza= new FormControl();
numAdulti= new FormControl();
numBambini= new FormControl();
numCamere= new FormControl();
idCamera = new FormControl();
selectFormControl = new FormControl('', [Validators.required]);
nativeSelectFormControl = new FormControl('', [Validators.required ]);
matcher = new MyErrorStateMatcher();
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

this.prenotazioniService.getCamereDisponibili(this.id).subscribe((data) => {
  // Verifica se l'array data.data esiste
  if (data.data && Array.isArray(data.data)) {
    // Itera attraverso ogni elemento nell'array
    data.data.forEach((element: { id: any; tipoCamera: any; }) => {
      const cameraId = element.id;
      const tipoCamera = element.tipoCamera;
      this.camereOptions.push({ id: cameraId, tipoCamera: tipoCamera });
    });
  }
});
}

openPopupPrenotazione(message: string):void{
  const dialogRef = this.dialog.open(PopUpPrenotazioneComponent, {
    width: '250px',
    data: { message },
    disableClose: true,
  });

}

onSubmit1(){
  
  const formData = {
    arrivo: new Date(this.arrivo.value).toISOString(),
    partenza: new Date(this.partenza.value).toISOString(),
    numAdulti: this.numAdulti.value,
    numBambini: this.numBambini.value,      
    idItinerario: this.idItinerario.toString(),
    numCamere: this.numCamere.value,
    idCamera: this.idCamera.value  };

  const timestampArrivo = new Date(this.arrivo.value).getTime();
  const timestampPartenza = new Date(this.partenza.value).getTime();

  this.prenotazioniService.prenotazioneAlloggio(
    this.idItinerario,
    this.idCamera.value,
    this.numAdulti.value,
    this.numBambini.value,
    this.numCamere.value,
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
}

onClose1(){
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

