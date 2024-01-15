import { RegistrazioneService } from './../../services/registrazione.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})

export class RegistrazioneComponent implements OnInit {

  hide = true;

      //GESTIONE ERRORI DataNascita
dataNascita = new FormControl();
  getErrorMessagedata() {
    if (this.dataNascita.hasError('required')) {
      return 'Inserisci Data';
    }
    return 
  }

    //GESTIONE ERRORI NOME
  nome = new FormControl('', [Validators.required, Validators.maxLength(10)]);
 getErrorMessageNome() {
    if (this.nome.hasError('required')) {
      return 'Inserisci nome';
    }
    return this.nome.hasError('maxlength') ? 'Nome troppo lungo' : '';
  }
  
  //GESTIONE ERRORI COGNOME
  cognome = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  getErrorMessageCognome() {
    if (this.cognome.hasError('required')) {
      return 'Inserisci cognome';
    }
    return this.cognome.hasError('maxlength')? 'Cognome troppo lungo' : '';
  }

  //GESTIONE ERRORI EMAIL
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Inserisci email';
    }
    return this.email.hasError('email') ? 'Email non valida' : '';
  }


  //GESTIONE ERRORI PASSWORD
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16),
    Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$"), ]);
    getErrorMessagepassword(): string {
      if (this.password.hasError('required')) {
        return 'Inserisci password';
      } else if (this.password.hasError('pattern')) {
        return 'Password non valida, inserire almeno un numero e un carattere speciale';
      } else if (this.password.hasError('minlength')) {
        return 'Password troppo piccola, minimo 8 caratteri';
      } else {
        return this.password.hasError('maxlength') ? 'Password troppo lunga, massimo 16 caratteri' : '';
      }
    }
      //SELECT
  selected = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', [Validators.required]);
  nativeSelectFormControl = new FormControl('', [Validators.required ]);
  matcher = new MyErrorStateMatcher();


  togglePasswordVisibility() {
  throw new Error('Method not implemented.');
  }

    constructor(private RegistrazioneService : RegistrazioneService ) {}
  
    ngOnInit(): void {    } 


    onSubmit(){

      const formData = {
        dataNascita: this.formatDate(this.dataNascita.value),
        nome: this.nome.value,
        cognome: this.cognome.value,
        email: this.email.value,
        password: this.password.value,
        selected : this.selected.value
      };
      this.resetForm();
      //INVIO DATI
      this.RegistrazioneService.registerUser('http://localhost:8080/api/v1/greentrails', {formData})
      .subscribe(data => 
        {
          console.log(data);
            console.log('Registrazione completata con successo!');
          },
          error => {
            console.error('Errore durante la registrazione:', error);
          }
        );

    }

    // FORMATO DATA
    private formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;

    }

    resetForm() {    //RESET CAMPI DEL FORM
      this.dataNascita.reset();
      this.nome.reset();
      this.cognome.reset();
      this.email.reset();
      this.password.reset();
      this.selected.reset();
        // AZZERA STATO "TOCCATO" E "SPORCO" DEL FORM
      this.dataNascita.markAsUntouched();
      this.nome.markAsUntouched();
      this.cognome.markAsUntouched();
      this.email.markAsUntouched();
      this.password.markAsUntouched();
      this.selected.markAsUntouched();

      this.dataNascita.markAsPristine();
      this.nome.markAsPristine();
      this.cognome.markAsPristine();
      this.email.markAsPristine();
      this.password.markAsPristine();
      this.selected.markAsPristine();
    }
}
