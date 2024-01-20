import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sezione2',
  templateUrl: './sezione2.component.html',
  styleUrls: ['./sezione2.component.css']
})
export class Sezione2Component implements OnInit {

  @Output() formDataChanged = new EventEmitter<any>();

  indirizzo = new FormControl('', [Validators.required]);
  cap = new FormControl('', [Validators.required]);
  citta = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  latitudine = new FormControl('', [Validators.required]);
  longitudine = new FormControl('', [Validators.required]);


  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Campo obbligatorio';
    }  else { 
      return  ' ';
    }
  }


  constructor() { }

  ngOnInit(): void {
  }

  salvaDati2() {
    const formData2 = {
      indirizzo: this.indirizzo.value,
      cap: this.cap.value,
      citta: this.citta.value,
      provincia: this.provincia.value,
      latitudine: this.latitudine.value,
      longitudine: this.longitudine.value,
    };
  
    this.formDataChanged.emit(formData2);
  
    console.log('Dati inviati al componente padre', formData2);
  }

}
