import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide: boolean = true;
  emailValue: string = ''; // Valore dell'email inserito dall'utente
  isEmailValid: boolean = true; // Flag per controllare la validità dell'email

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
