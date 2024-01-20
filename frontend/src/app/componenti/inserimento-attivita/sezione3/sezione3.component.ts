import { HttpHeaders } from '@angular/common/http';
import { AttivitaServiceService } from './../../../servizi/attivita-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sezione3',
  templateUrl: './sezione3.component.html',
  styleUrls: ['./sezione3.component.css']
})
export class Sezione3Component implements OnInit {

  @Output() formDataChanged = new EventEmitter<any>();




  constructor(private AttivitaServiceService: AttivitaServiceService, private formBuilder: FormBuilder) { }
  
  toppings = new FormControl(false, [Validators.required]);

  
 


  ngOnInit(): void {}

  
  salvaDati3() {

    const politicheAntispreco: boolean = this.toppings.value!
    const prodottiLocali: boolean = this.toppings.value!
    const energiaVerde: boolean = this.toppings.value!
    const raccoltaDifferenziata: boolean = this.toppings.value!
    const limiteEmissioneCO2: boolean = this.toppings.value!
    const contattoConNatura: boolean = this.toppings.value!
  

const formValue = {
  politicheAntispreco,
  prodottiLocali,
  energiaVerde,
  raccoltaDifferenziata,
  limiteEmissioneCO2,
  contattoConNatura


}
console.log(formValue)
  this.AttivitaServiceService.inserimento(formValue)
    .subscribe((response) => {
      console.log('Dati inviati')
      const id = response.data.id;
      console.log('ID ottenuto:', id);
      this.formDataChanged.emit(id);
        
    console.log('Dati inviati al componente padre', id);
    });



   

  }


}
