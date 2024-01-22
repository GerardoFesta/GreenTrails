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
  numAdulti1= new FormControl();
  numBambini1= new FormControl();
  idItinerario: any;

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

      this.idItinerario = response.data.id;
 
      console.log('ID ottenuto:', this.idItinerario);
});

    this.prenotazioniService.currentId.subscribe(id => {
      this.id = id;
      console.log('Id attivita', this.id)
  });
}
  onSubmit(){
    console.log('Entrato nella onSubmit');
    console.log(this.formatDate(this.arrivo1.value),
    this.formatDate(this.partenza1.value),)

    
    const formData = {
      arrivo1: new Date(this.arrivo1.value).toISOString(),
      partenza1: new Date(this.partenza1.value).toISOString(),
      numAdulti: this.numAdulti1.value,
      numBambini1: this.numBambini1.value,      
      id: this.id,
      idItinerario: this.idItinerario.toString()
    };
    console.log(formData)

    const timestampArrivo = new Date(this.arrivo1.value).getTime();
    const timestampPartenza = new Date(this.partenza1.value).getTime();

    console.log(timestampArrivo)

    this.prenotazioniService.prenotazioneAttivita(
      this.idItinerario,
      this.id,
      this.numAdulti1.value,
      this.numBambini1.value,
      timestampArrivo,
      timestampPartenza).subscribe(
      (response) =>{
        console.log('Dati inviati', response)

      }
    )

//this.idItinerario, this.id, this.numAdulti1.value, this.numBambini1.value,this.arrivo1,this.partenza1

  }
}
