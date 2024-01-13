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

      //SELECT


 


  togglePasswordVisibility() {
  throw new Error('Method not implemented.');
  }

    constructor(private RegistrazioneService : RegistrazioneService ) {}
  
    ngOnInit(): void {
      
    } 
    registrazioneform = false;
    onSubmit(){
      console.log('Entrato nella onSubmit');

      const formData = {
        nome: this.nome.value,
        cognome: this.cognome.value,
        email: this.email.value,
        password: this.password.value,
        selected : this.selected.value
      };

      if (this.nome.valid && this.cognome.valid && this.email.valid && this.password.valid) {
        this.RegistrazioneService.registerUser(formData).subscribe(
          response => {
            console.log('Registrazione completata con successo!', response);
          },
          error => {
            console.error('Errore durante la registrazione:', error);
          }
        );
    }
}
  
  
}