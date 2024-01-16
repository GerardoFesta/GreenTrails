import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {

  arrivo1 = new FormControl('',[Validators.required]);
  partenza1= new FormControl('',[Validators.required]);
  numAdulti1= new FormControl('',);
  numBambini1= new FormControl('',);


  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('Entrato nella onSubmit');

    const formData = {
      arrivo1 :this.arrivo1.value,
      partenza1: this.partenza1.value,
      numAdulti1: this.numAdulti1.value,
      numBambini1: this.numBambini1.value,      
    };
    console.log(formData)



  }
}
