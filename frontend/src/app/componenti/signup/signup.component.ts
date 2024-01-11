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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  hide = true;

  
  //GESTIONE ERRORI NOME
  nome = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  getErrorMessageNome() {
    if (this.nome.hasError('required')) {
      return 'Inserisci nome';
    }
    return this.nome.hasError('maxLength') ? 'Nome troppo lungo' : '';
  }
  
  //GESTIONE ERRORI COGNOME
  cognome = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  getErrorMessageCognome() {
    if (this.cognome.hasError('required')) {
      return 'Inserisci cognome';
    }
    return this.cognome.hasError('maxLength')? 'Cognome troppo lungo' : '';
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
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  nativeSelectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid'), ]);
  matcher = new MyErrorStateMatcher();

      //SELECT


 


  togglePasswordVisibility() {
  throw new Error('Method not implemented.');
  }

    constructor() {}
  
    ngOnInit(): void {
      
    } 
    signupform = false;
    onSubmit(){

      if (this.nome.valid && this.cognome.valid && this.email.invalid && this.password.valid) {
        this.signupform = true;
        console.log('Submit button pressed!');
      } 
    
    }
}
  
  
  
