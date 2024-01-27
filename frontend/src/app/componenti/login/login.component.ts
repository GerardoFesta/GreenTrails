import { UtenteService } from './../../servizi/utente.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm: FormGroup
hide = true;
email= new FormControl('')
password= new FormControl('')


  constructor(private utenteService: UtenteService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }
  

  onSubmit() {}


  onClick() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.utenteService.login(email, password).subscribe(
        (response: any) => {
          console.log('Login avvenuto con successo:', response);
          this.mostraMessaggio('Bentornato'); 

          if (response && response.status === 'success') {
            if (response.data.ruolo) {
              this.router.navigate(['']);
            } else {
              this.router.navigate(['/registrazione']);
            }
          } else {
            console.error('La risposta dal servizio non è valida:', response);
            this.mostraMessaggio('Email o Password errate');
          }
        },
        (error: any) => {
          console.error('Errore durante il login:', error);
          if (error.status === 401) {
            this.mostraMessaggio('Email o password errate');
          }
        }
      );
    } else {
      this.mostraMessaggio('Email o password errate');
    }
  }

  click() {
    this.mostraMessaggio("Ti abbiamo inviato una mail. Controlla la posta elettronica e segui le istruzioni per cambiare la password");
  }

  mostraMessaggio(messaggio: string, errore: boolean = false) {
    this.snackBar.open(messaggio, 'Chiudi', {
      duration: 5000
    });
  }

  onLogoutClick(): void {
    this.utenteService.logout().subscribe(
      (response) => {
        console.log('Logout successful:', response);
      },
      (error) => {
        console.error('Error during logout:', error);
      }
    );
  }
}




