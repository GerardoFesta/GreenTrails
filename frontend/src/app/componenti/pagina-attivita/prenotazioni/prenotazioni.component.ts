import { CamereService } from './../../../servizi/camere.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpPrenotazioneComponent } from '../pop-up-prenotazione/pop-up-prenotazione.component';
import { PrenotazioniAlloggioService } from 'src/app/servizi/prenotazioni-alloggio.service';
import { ItinerariService } from 'src/app/servizi/itinerari.service';
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

  camereOptions: { id: number, tipoCamera: string, capienza: any}[] = [];
  capienzaSelezione: number = 0;
  idAttivita: number = 0;
  idCamera: number = 0;

  selectFormControl = new FormControl('', [Validators.required]);
  nativeSelectFormControl = new FormControl('', [Validators.required ]);
  matcher = new MyErrorStateMatcher();
  idItinerario: any;

  firstFormGroup: FormGroup;
  secondFormGroup = this._formBuilder.group({secondCtrl: '',});
  isOptional = false;

  disponibilita: any;
  isDisponibile: boolean = false;

  capienza: any;
  isCapienza: boolean = false;

  siClicked = false;
  creaClicked = false;
  azioneEseguita = false;


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  constructor(private prenotazioniAlloggioService: PrenotazioniAlloggioService, 
    private itinerariService : ItinerariService,
    private dialog: MatDialog, 
    private camereService: CamereService,
    private _formBuilder: FormBuilder) {
  this.firstFormGroup = this._formBuilder.group({
    arrivo: ['', Validators.required],
    partenza: ['', Validators.required],
    numAdulti: ['', Validators.required],
    numBambini: ['', Validators.required],
    numCamere: ['', Validators.required],
    idCamera: ['', Validators.required]
  });
  this.idItinerario = this.itinerariService.getidItinerario();
      }
  ngOnInit(): void {
  this.idItinerario = localStorage.getItem('idItinerario');   
  this.itinerariService.currentId.subscribe(id => {
    this.idAttivita = id;
    this.idItinerario = localStorage.getItem('idItinerario');
});

this.camereService.getCamereDisponibili(this.idAttivita).subscribe((data) => {

  if (data.data && Array.isArray(data.data)) {
    data.data.forEach((element: { id: any; tipoCamera: any; capienza: any }) => {
      const cameraId = element.id;
      const tipoCamera = element.tipoCamera;
      const capienzaCamera = element.capienza;

      this.camereOptions.push({ id: cameraId, tipoCamera: tipoCamera, capienza: capienzaCamera });
      this.idCamera = element.id;
    });

  }
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

  //VERIFICA DISPONIBILITA
  verificaDisponibilita() {
    console.log('Camera',this.idCamera)
  const formData = {
    arrivo: this.formatDate(this.firstFormGroup.get('arrivo')?.value),
    partenza: this.formatDate(this.firstFormGroup.get('partenza')?.value), 
    idCamera: this.idCamera,
  };
  const cameraSelezionata = this.camereOptions.find(camera => camera.id === this.idCamera);

  this.prenotazioniAlloggioService.verificaDisponibilitaAlloggio(
        this.idCamera,
    formData.arrivo,
    formData.partenza).subscribe(
      (response) =>{
        this.disponibilita = this.firstFormGroup.get('numCamere')?.value < response.data? 'Disponibile' : 'Non disponibile';
        this.isDisponibile = this.firstFormGroup.get('numCamere')?.value < response.data? true : false;
        if (cameraSelezionata) {
          this.capienzaSelezione = cameraSelezionata.capienza;
          console.log(this.capienzaSelezione);
          this.capienza = this.firstFormGroup.get('numAdulti')?.value +
            this.firstFormGroup.get('numBambini')?.value  < this.capienzaSelezione * this.firstFormGroup.get('numCamere')?.value? 'Capienza' : 'Non capienza';
          this.isCapienza = this.firstFormGroup.get('numAdulti')?.value + 
            this.firstFormGroup.get('numBambini')?.value < this.capienzaSelezione * this.firstFormGroup.get('numCamere')?.value? true : false;
         
        }
      })
  }

  //AGGIUNGI ATTIVITA ALL'ITINERARIO
  aggiungiAllItinerario() {
  this.siClicked = false;
  this.creaClicked = true;
  this.azioneEseguita = true;
  }

  // CREAZIONE ITINERARIO
  creaItinerario() {
  this.itinerariService.creaItinerari().subscribe((response) => {
    const idItinerario = response.data.id;
    localStorage.setItem('idItinerario', idItinerario.toString());
    this.idItinerario = idItinerario;
    this.siClicked = false;
    this.creaClicked = true;
    this.azioneEseguita = true;
  });
  }

   // INVIO DEI DATI
  onSubmit1(){ 
   const formData = {
     arrivo: this.formatDate(this.firstFormGroup.get('arrivo')?.value),
     partenza: this.formatDate(this.firstFormGroup.get('partenza')?.value),
     numAdulti: this.firstFormGroup.get('numAdulti')?.value,
     numBambini: this.firstFormGroup.get('numBambini')?.value,     
     idItinerario: this.idItinerario,
     numCamere: this.firstFormGroup.get('numCamere')?.value,
     idCamera: this.firstFormGroup.get('idCamera')?.value };

  this.prenotazioniAlloggioService.prenotazioneAlloggio(
     this.idItinerario,
     this.firstFormGroup.get('idCamera')?.value,
     this.firstFormGroup.get('numCamere')?.value,
     this.firstFormGroup.get('numAdulti')?.value,
     this.firstFormGroup.get('numBambini')?.value,
     formData.arrivo,
     formData.partenza).subscribe(
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

}