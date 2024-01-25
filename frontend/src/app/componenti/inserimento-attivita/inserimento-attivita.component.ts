
import { HttpParams } from '@angular/common/http';
import { AttivitaServiceService } from './../../servizi/attivita-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PopUpAlloggioComponent } from './pop-up-alloggio/pop-up-alloggio.component';
import { MatDialog } from '@angular/material/dialog';

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
  prezzo: any;
  politica1: boolean = false;
  politica2: boolean = false;
  politica3: boolean = false;
  politica4: boolean = false;
  politica5: boolean = false;
  politica6: boolean = false;



  constructor( private formBuilder: FormBuilder, private attivitaServiceService: AttivitaServiceService, private dialog: MatDialog) {
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
      politicheAntispreco: false,   
      prodottiLocali: false,   
      energiaVerde: false,   
      raccoltaDifferenziata: false,   
      limiteEmissioneCO2: false,   
      contattoConNatura: false,  
      descrizioneBreve:['',Validators.required],
      costo:['',Validators.required, Validators],
      descrizioneLunga:['',Validators.required],
      file:['',Validators.required]

    });

  }


  categorieAll=[
    {value: 0, label: 'Hotel'},
    {value: 1, label: 'Bed & Breakfast'},
    {value: 2, label: 'Villaggio Turistico'},
    {value: 3, label: 'Ostello'},
    
  ]
  categorieAtt=[
    {value: 0, label: 'All\'\aperto'},
    {value: 1, label: 'Visite Culturali-Storichr'},
    {value: 2, label: 'Relax'},
    {value: 3, label:'Gastronomia'}
  ]

  ngOnInit(): void {  }

  isTipoFalse(): boolean {
    return this.inserimento.get('tipo')?.value === 'false';
  }

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

  openPopupAlloggio(idAttivita: number):void{
    const dialogRef = this.dialog.open(PopUpAlloggioComponent, {
      width: '60%',
      data: { idAttivita: idAttivita}

    });
  }

  salvaDati3() {

  this.attivitaServiceService.inserimento(
    this.politica1 =  this.inserimento.get('politicheAntispreco')?.value, 
    this.politica2 =  this.inserimento.get('prodottiLocali')?.value,
    this.politica3 = this.inserimento.get('energiaVerde')?.value,
    this.politica4 = this.inserimento.get('raccoltaDifferenziata')?.value,
    this.politica5 = this.inserimento.get('limiteEmissioneCO2')?.value,
    this.politica6 = this.inserimento.get('contattoConNatura')?.value).subscribe((response) => {
      console.log('Dati inviati')
      console.log('Dati inviati',this.politica1)
      console.log('Dati inviati',this.politica2)
      console.log('Dati inviati',this.politica3)
      console.log('Dati inviati',this.politica4)
      console.log('Dati inviati',this.politica5)
      console.log('Dati inviati',this.politica6)

      this.idPolitiche = response.data.id;
      console.log('ID ottenuto:', this.idPolitiche);        
    console.log('Dati inviati al componente padre', this.idPolitiche);

console.log(this.inserimento.get('tipo')?.value )

if(this.inserimento.get('tipo')?.value === 'true'){   
  console.log('categoriaAlloggio', this.inserimento.get('categoria')?.value);
}else{
console.log('categoriaAttivitaTuristica', this.inserimento.get('categoria')?.value);

}

    });
  }

    onSubmit() {
    
     const formData = new FormData()
     formData.append('alloggio', this.inserimento.get('tipo')?.value);
     formData.append('nome', this.inserimento.get('nome')?.value);
     formData.append('disponibilita', this.inserimento.get('disponibilita')?.value)
     if(this.inserimento.get('tipo')?.value === 'true'){
      formData.append('categoriaAlloggio', this.inserimento.get('categoria')?.value);
     }else{
      formData.append('categoriaAttivitaTuristica', this.inserimento.get('categoria')?.value);
     }
     formData.append('indirizzo', this.inserimento.get('indirizzo')?.value);
     formData.append('cap',this.inserimento.get('cap')?.value);
     formData.append('citta', this.inserimento.get('citta')?.value);
     formData.append('provincia', this.inserimento.get('provincia')?.value);
     formData.append('latitudine', this.inserimento.get('latitudine')?.value);
     formData.append('longitudine', this.inserimento.get('longitudine')?.value);
     formData.append('descrizioneBreve', this.inserimento.get('descrizioneBreve')?.value);
     this.prezzo = formData.append('prezzo', this.inserimento.get('costo')?.value);
     formData.append('descrizioneLunga', this.inserimento.get('descrizioneLunga')?.value);
     formData.append('valori', this.idPolitiche);
     if (this.selectedFiles.length > 0) {
      // If files are selected, append them to the FormData
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('immagine', this.selectedFiles[i]);
      }
    }
     console.log(formData)



   this.attivitaServiceService.inserimentoAttivita( formData)
     .subscribe((response) => {
       console.log('Dati inviati', response)
       if(this.inserimento.get('tipo')?.value === 'true'){ 
        const idAttivita = response.data.id;
        this.openPopupAlloggio(idAttivita)
            }else{
        console.log('Attivita')
                    
           }
             });


    
   }
}

