import { PrenotazioniService } from './../../servizi/prenotazioni.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {
id: any
  arrivo1 = new FormControl();
  partenza1= new FormControl();
  numAdulti1= new FormControl('',);
  numBambini1= new FormControl('',);

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  constructor(private PrenotazioniService: PrenotazioniService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log('Entrato nella onSubmit');

    const formData = {
      arrivo1 :this.formatDate(this.arrivo1.value),
      partenza1: this.formatDate(this.partenza1.value),
      numAdulti1: this.numAdulti1.value,
      numBambini1: this.numBambini1.value,      
      id: this.id
    };
    console.log(formData)

 
    this.PrenotazioniService.itinerari()
    .subscribe((response) => {
      console.log('Dati inviati')

      this.id = response.data.id;
 
      console.log('ID ottenuto:', this.id);
        
    console.log('Dati inviati al componente padre', this.id);





    
    });

    this.PrenotazioniService.prenotazione(formData).subscribe(
      (response) =>{
        console.log('Dati inviati', formData, response)

      }
    )



  }
}
