import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-sezione1',
  templateUrl: './sezione1.component.html',
  styleUrls: ['./sezione1.component.css']
})
export class Sezione1Component implements OnInit {

  @Output() formDataChanged = new EventEmitter<any>();


  nome = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  disponibilita = new FormControl('', [Validators.required, Validators.pattern("^[0-9]+")]);



        //SELECT
        alloggio = new FormControl(false, [Validators.required]);
        categoriaAlloggio = new FormControl(false, [Validators.required]);
        selectFormControl = new FormControl('',[Validators.required]);
        nativeSelectFormControl = new FormControl('',[Validators.required ]);
        matcher = new MyErrorStateMatcher();


        




        getErrorMessage(control: AbstractControl): string {
          if (control.hasError('required')) {
            return 'Campo obbligatorio';
          }
          else{
            return '';
          }

        }
  
  constructor() { }

  ngOnInit(): void {
  }

salvaDati() {
  // Verifica se tutti i campi sono validi

    const formData1 = {
      nome: this.nome.value,
      disponibilita: this.disponibilita.value,
      alloggio: this.alloggio.value,
      categoriaAlloggio: this.categoriaAlloggio.value,
    };

    // Invia i dati al componente padre solo se tutti i campi sono validi
    this.formDataChanged.emit(formData1);

    console.log('Dati inviati al componente padre', formData1);
  } 
}
