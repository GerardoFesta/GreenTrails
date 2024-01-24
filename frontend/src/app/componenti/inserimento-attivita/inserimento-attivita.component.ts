
import { HttpParams } from '@angular/common/http';
import { AttivitaServiceService } from './../../servizi/attivita-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-inserimento-attivita',
  templateUrl: './inserimento-attivita.component.html',
  styleUrls: ['./inserimento-attivita.component.css']
})
export class InserimentoAttivitaComponent implements OnInit {
  inserimento: FormGroup;
  matcher = new MyErrorStateMatcher();
  idPolitiche: any;


  constructor( private formBuilder: FormBuilder, private attivitaServiceService: AttivitaServiceService) {
    this.inserimento = this.formBuilder.group({
      nome:['',Validators.required],
      tipo:['',Validators.required],
      categoria:[true,Validators.required],
      disponibilita:[0,Validators.required],
      indirizzo: ['',Validators.required],
      cap:['',Validators.required],
      citta: ['',Validators.required],
      provincia: ['',Validators.required],
      latitudine: ['',Validators.required],
      longitudine: ['', Validators.required],
      politicheAntispreco: ['', Validators.required],   
      prodottiLocali: ['', Validators.required],   
      energiaVerde: ['', Validators.required],   
      raccoltaDifferenziata: ['', Validators.required],   
      limiteEmissioneCO2: ['', Validators.required],   
      contattoConNatura: ['', Validators.required],  
      descrizioneBreve:['',Validators.required],
      prezzo:['',Validators.required],
      descrizioneLunga:['',Validators.required],
      file:['',Validators.required]

    });

  }


  categorieAll=[
    {value: 1, label: 'Hotel'},
    {value: 2, label: 'Bed & Breakfast'},
    {value: 3, label: 'Villaggio Turistico'},
    {value: 4, label: 'Ostello'},
    
  ]
  categorieAtt=[
    {value: 1, label: 'All\'\aperto'},
    {value: 2, label: 'Visite Culturali-Storichr'},
    {value: 3, label: 'Relax'},
    {value: 4, label:'Gastronomia'}
  ]

  ngOnInit(): void {  }

  isTipoFalse(): boolean {
    return this.inserimento.get('tipo')?.value === 'false';
  }

 /* ricezione(id: number){
    console.log("Dato ricevuto dal figlio", this.idPolitiche);
    this.valori = this.idPolitiche;
  }*/

  toppings = new FormControl(false, [Validators.required]);

  //File
  selectedFiles: File[] = [];
  errorMessage: string | null = null;
 onFilesSelected(event: any): void {
   const files: FileList = event.target.files;
   // Controlla se ci sono file di tipo diverso da immagine
   const nonImageFiles: File[] = Array.from(files).filter(file => !file.type.startsWith('image/'));
   if (nonImageFiles.length > 0) {
     this.errorMessage = 'Puoi selezionare solo file di immagine.';
    } else {
       this.errorMessage = null;      
       // Aggiungi solo i file di tipo immagine alla lista
       const imageFiles: File[] = Array.from(files).filter(file => file.type.startsWith('image/'));
       this.selectedFiles.push(...imageFiles);
      }
  }

  salvaDati3() {

    const politicheAntispreco: boolean = this.toppings.value!
    const prodottiLocali: boolean = this.toppings.value!
    const energiaVerde: boolean = this.toppings.value!
    const raccoltaDifferenziata: boolean = this.toppings.value!
    const limiteEmissioneCO2: boolean = this.toppings.value!
    const contattoConNatura: boolean = this.toppings.value!
  

const formValue = {
  politicheAntispreco,
  prodottiLocali,
  energiaVerde,
  raccoltaDifferenziata,
  limiteEmissioneCO2,
  contattoConNatura

}
console.log(formValue)
  this.attivitaServiceService.inserimento(formValue)
    .subscribe((response) => {
      console.log('Dati inviati')
      this.idPolitiche = response.data.id;
      console.log('ID ottenuto:', this.idPolitiche);        
    console.log('Dati inviati al componente padre', this.idPolitiche);



    });
  }


 
    onSubmit() {
    
     const params = new HttpParams()
     .set('alloggio', this.inserimento.get('alloggio')?.value)
     .set('nome', this.inserimento.get('nome')?.value)
     .set('categoria', this.inserimento.get('categoria')?.value)
     .set('indirizzo', this.inserimento.get('indirizzo')?.value)
     .set('cap',this.inserimento.get('cap')?.value) 
     .set('citta', this.inserimento.get('citta')?.value)
     .set('provincia', this.inserimento.get('provincia')?.value)
     .set('latitudine', this.inserimento.get('latitudine')?.value)
     .set('longitudine', this.inserimento.get('longitudine')?.value)
     .set('descriziooneBreve', this.inserimento.get('descrizioneBreve')?.value)
     .set('prezzo', this.inserimento.get('prezzo')?.value)
     .set('descrizioneLunga', this.inserimento.get('descrizioneLunga')?.value)
     .set('valori', this.inserimento.get('valori')?.value)
     .set('file', this.inserimento.get('file')?.value)
 

   this.attivitaServiceService.inserimentoAttivita( params)
     .subscribe((response) => {
       console.log('Dati inviati', response)
             });
   }
}

