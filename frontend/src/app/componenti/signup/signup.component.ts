import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  togglePasswordVisibility() {
  throw new Error('Method not implemented.');
  }
    emailValue: string = ''; // Valore dell'email inserito dall'utente
    isEmailValid: boolean = true; // Flag per controllare la validità dell'email
  hide: boolean = true;
  
    validateEmail() {
      // Logica per la validazione dell'email (es. regex, verifica della struttura dell'email)
      // In questo esempio, utilizziamo una semplice validazione per scopi dimostrativi
      this.isEmailValid = /\S+@\S+\.\S+/.test(this.emailValue);
  
    }
  
    constructor() { }
  
    ngOnInit(): void {
  
    }
  
    onSubmit(form: any){
      console.log(form)
    }
  
  }
  
  
  
