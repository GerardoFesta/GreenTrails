import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  arrivo = new FormControl('',[Validators.required]);
  partenza= new FormControl('',[Validators.required]);
  numAdulti= new FormControl('',);
  numBambini= new FormControl('',);
  numCamere= new FormControl('',);

  tipo = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', [Validators.required]);
  nativeSelectFormControl = new FormControl('', [Validators.required ]);
  matcher = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('Entrato nella onSubmit');

    const formData = {
      arrivo :this.arrivo.value,
      partenza: this.partenza.value,
      numAdulti: this.numAdulti.value,
      numBambini: this.numBambini.value,
      numCamere: this.numCamere.value,
      tipo : this.tipo.value,


      
    };
    console.log(formData)



  }




}
