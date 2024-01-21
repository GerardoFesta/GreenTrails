import { PrenotazioniService } from '../../../servizi/prenotazioni.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-prenot-attivita',
  templateUrl: './prenot-attivita.component.html',
  styleUrls: ['./prenot-attivita.component.css']
})
export class PrenotAttivitaComponent implements OnInit {
  id: number = 0;
  arrivo1 = new FormControl();
  partenza1= new FormControl();
  numAdulti1= new FormControl('', [Validators.required]);
  numBambini1= new FormControl();
  idItinerari: any;

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  constructor(private prenotazioniService: PrenotazioniService) { }

  ngOnInit(): void {
     
    this.prenotazioniService.creaItinerari()
    .subscribe((response) => {
      console.log('Dati inviati')
      console.log(response.data)

      this.idItinerari = response.data.id;
 
      console.log('ID ottenuto:', this.idItinerari);
});

    this.prenotazioniService.currentId.subscribe(id => {
      this.id = id;
  });
}
  onSubmit(){
    console.log('Entrato nella onSubmit');



    const formData = {
      arrivo1 :this.formatDate(this.arrivo1.value),
      partenza1: this.formatDate(this.partenza1.value),
      numAdulti: this.numAdulti1.value,
      numBambini1: this.numBambini1.value,      
      id: this.id,
      idItinerari: this.idItinerari.toString()
    };
    console.log(formData)


    this.prenotazioniService.prenotazione(this.idItinerari, this.id, this.numAdulti1, this.numBambini1,this.arrivo1,this.partenza1).subscribe(
      (response) =>{
        console.log('Dati inviati', formData, response)

      }
    )



  }
}
