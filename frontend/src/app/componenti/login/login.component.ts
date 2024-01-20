import { UtenteService } from './../../servizi/utente.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup
hide = true;
email= new FormControl('', [Validators.required, Validators.email])
password= new FormControl('', [Validators.required])


  constructor(private UtenteService: UtenteService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  getError(){
    const emailControl = this.email.get('email');
    const passwordControl = this.password.get('password')
    if(emailControl && passwordControl){
      if(emailControl.hasError('required') && passwordControl.hasError('required'))
      return 'Inserisci mail'
    }
    return'Inserisci mail e password'
  }

  onSubmit() {}


  onClick() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;


    
      this.UtenteService.login(email, password).subscribe(
        (response: any) => {
          console.log('Login avvenuto con successo:', response);
          this.mostraMessaggio ("Bentornato");
            if (response && response.status === 'success') {
            const isGestore = response.ruolo === 'GESTORE';
            if (isGestore) {
              this.router.navigate(['/paginaattiva']);
            } else {
              this.router.navigate(['/registrazione']);
            }
          } else {
            console.error('La risposta dal servizio non è valida:', response);
          }
        },
        (error: any) => {
          console.error('Errore durante il login:', error);
          this.mostraMessaggio ("Mail o Password sbagliate");
        }
      );
    }
  }

  mostraMessaggio(messaggio: string, errore: boolean = false) {
    this.snackBar.open(messaggio, 'Chiudi', {
      duration: 5000, });

  }
 }
