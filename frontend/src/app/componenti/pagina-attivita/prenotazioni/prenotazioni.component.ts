import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PrenotazioniService } from 'src/app/servizi/prenotazioni.service';

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

constructor(private prenotazioniService: PrenotazioniService) { }

ngOnInit(): void {
  console.log('Prima della chiamata',this.id)


   
  this.prenotazioniService.creaItinerari()
  .subscribe((response) => {
    console.log('Dati inviati')
    console.log(response.data)

    this.idItinerario = response.data.id;

    console.log('ID ottenuto:', this.idItinerario);
});

  this.prenotazioniService.currentId.subscribe(id => {
    this.id = id;
    console.log('Id attivita', this.id)
});

this.prenotazioniService.getCamereDisponibili(this.id).subscribe((data) => {
  console.log('Dopo la chiamata',this.id);
  console.log('Tipo camera', data)

  // Verifica se l'array data.data esiste
  if (data.data && Array.isArray(data.data)) {
    // Itera attraverso ogni elemento nell'array
    data.data.forEach((element: { id: any; tipoCamera: any; }) => {
      // Accedi alle proprietà desiderate (id e tipoCamera)
      const cameraId = element.id;
      const tipoCamera = element.tipoCamera;

      // Puoi fare qualcosa con cameraId e tipoCamera qui
      console.log('ID camera:', cameraId);
      console.log('Tipo camera:', tipoCamera);

      this.camereOptions.push({ id: cameraId, tipoCamera: tipoCamera });
      console.log(this.camereOptions)

    });
  }
});
}


onSubmit1(){

  console.log('Entrato nella onSubmit');
  console.log(this.formatDate(this.arrivo.value),
  this.formatDate(this.partenza.value),)
  console.log(this.idCamera)

  
  const formData = {
    arrivo: new Date(this.arrivo.value).toISOString(),
    partenza: new Date(this.partenza.value).toISOString(),
    numAdulti: this.numAdulti.value,
    numBambini: this.numBambini.value,      
    id: this.id,
    idItinerario: this.idItinerario.toString(),
    numCamere: this.numCamere.value,
    idCamera: this.idCamera.value  };

  console.log(formData)
  console.log('Id della alloggio', this.id)


  const timestampArrivo = new Date(this.arrivo.value).getTime();
  const timestampPartenza = new Date(this.partenza.value).getTime();

  console.log(timestampArrivo)

  this.prenotazioniService.prenotazioneAlloggio(
    this.idItinerario,
    this.id,
    this.idCamera.value,
    this.numAdulti.value,
    this.numBambini.value,
    this.numCamere.value,
    timestampArrivo,
    timestampPartenza).subscribe(
      (response) =>{
        console.log('Dati inviati', response)

      },   (error) => {
    console.error('Errore durante la richiesta API:', error);
    // Gestisci l'errore qui, ad esempio mostrando un messaggio all'utente
  }
  )
}
}

