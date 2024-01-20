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
  valori: number | undefined;

  constructor(private AttivitaServiceService: AttivitaServiceService ) {
 
  }
id: any;
  ngOnInit(): void {}

        selectFormControl = new FormControl('',[Validators.required]);
        nativeSelectFormControl = new FormControl('',[Validators.required ]);
        matcher = new MyErrorStateMatcher();

        nome = new FormControl('', [Validators.required, Validators.maxLength(10)]);
        disponibilita = new FormControl('', [Validators.required, Validators.pattern("^[0-9]+")]);
        alloggio = new FormControl(false, [Validators.required]);
        categoriaAlloggio = new FormControl(false, [Validators.required]);
        indirizzo = new FormControl('', [Validators.required]);
        cap = new FormControl('', [Validators.required]);
        citta = new FormControl('', [Validators.required]);
        provincia = new FormControl('', [Validators.required]);
        latitudine = new FormControl('', [Validators.required]);
        longitudine = new FormControl('', [Validators.required]);
        descrizioneBreve = new FormControl('', [Validators.required]);
        prezzo = new FormControl('', [Validators.required]);
        descrizioneLunga = new FormControl('', [Validators.required]);
        file = new FormControl('', [Validators.required]);
        politicheAntispreco = new FormControl();   
        prodottiLocali = new FormControl();   
        energiaVerde = new FormControl();   
        raccoltaDifferenziata = new FormControl();   
        limiteEmissioneCO2 = new FormControl();   
        contattoConNatura = new FormControl();   
   
  
        getErrorMessage(control: AbstractControl): string {
          if (control.hasError('required')) {
            return 'Campo obbligatorio';
          }
          else{
            return '';
          }

        }

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
  
     ricezione(id: number){
      console.log("Dato ricevuto dal figlio", id);
      this.valori = id;
     }
     toppings = new FormControl(false, [Validators.required]);
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
    this.AttivitaServiceService.inserimento(formValue)
      .subscribe((response) => {
        console.log('Dati inviati')


        this.id = response.data.id;
   
        console.log('ID ottenuto:', this.id);
          
      console.log('Dati inviati al componente padre', this.id);



      });
  
  
  
     
  
    }

  onSubmit() {
    

     const formData ={
        alloggio: this.alloggio.value,
        nome: this.nome.value,
        categoriaAlloggio: this.categoriaAlloggio.value,
        indirizzo: this.indirizzo.value,
        cap: this.cap.value,
        citta: this.citta.value,
        provincia: this.provincia.value,
        latitudine: this.latitudine.value,
        longitudine: this.longitudine.value,
        descrizioneBreve: this.descrizioneBreve.value,
        prezzo: this.prezzo.value,
        descrizioneLunga: this.descrizioneLunga.value,
        file: this.file.value,
        valori : this.id
     //   formData3: this.myForm.get('sezione3Data')?.value,

    }

    const params = new HttpParams()
    .set('alloggio', !formData.alloggio)
    .set('nome', !formData.nome)
    .set('categoriaAlloggio', !formData.categoriaAlloggio)
    .set('indirizzo', !formData.indirizzo)
    .set('cap', !formData.cap)
    .set('citta', !formData.citta)
    .set('provincia', !formData.provincia)
    .set('latitudine', !formData.latitudine)
    .set('longitudine', !formData.longitudine)
    .set('descriziooneBreve', !formData.descrizioneBreve)
    .set('prezzo', !formData.prezzo)
    .set('descrizioneLunga', !formData.descrizioneLunga)
    .set('valori', !formData.nome)
    .set('file', !formData.file)




    // Fai qualcosa con i dati (ad esempio, invia al server)
    console.log('Tutti i dati', formData);


  this.AttivitaServiceService.inserimentoAttivita( formData)
    .subscribe((response) => {
      console.log('Dati inviati', response)
            });
  }
  }

