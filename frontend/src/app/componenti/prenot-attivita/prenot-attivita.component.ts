import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {

  arrivo = new FormControl('',[Validators.required]);
  partenza= new FormControl('',[Validators.required]);
  numAdulti= new FormControl('',);
  numBambini= new FormControl('',);


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('Entrato nella onSubmit');

    const formData = {
      arrivo :this.arrivo.value,
      partenza: this.partenza.value,
      numAdulti: this.numAdulti.value,
      numBambini: this.numBambini.value,      
    };
    console.log(formData)



  }
}
