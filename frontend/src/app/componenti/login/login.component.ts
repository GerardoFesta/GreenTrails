import { LoginService } from 'src/app/servizi/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;
openBottomSheet: any;
hide:any;
email= new FormControl('', [Validators.required, Validators.email])
password= new FormControl('', [Validators.required])
  dataNascita: any;
  nome: any;
  cognome: any;


  constructor(private LoginService: LoginService, private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: this.email, // Aggiungi il campo email al FormGroup
      password: this.password, // Aggiungi il campo password al FormGroup
      isGestore: false // Imposta il valore predefinito per isGestore (potresti voler modificare questo valore a seconda delle tue esigenze)
    });
  }
  
  getError(){
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password')
    if(emailControl && passwordControl){
      if(emailControl.hasError('required') && passwordControl.hasError('required'))
      return 'Email or password are wrong'
    }
    return'check if the email or password you put are correct!'
  }

  onSubmit() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  

  
  }
}