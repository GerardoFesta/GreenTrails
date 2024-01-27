import { Component } from '@angular/core';

@Component({
  selector: 'app-generazione-automatica',
  templateUrl: './generazione-automatica.component.html',
  styleUrls: ['./generazione-automatica.component.css']
})
export class GenerazioneAutomaticaComponent {

  attivitaList: any[] = [
    {nome: 'attivita 1', descrizione: 'descrizione attivita 1'},
    {nome: 'attivita 2', descrizione: 'descrizione attivita 2'},
    {nome: 'attivita 3', descrizione: 'descrizione attivita 3'},
    {nome: 'attivita 4', descrizione: 'descrizione attivita 4'},
  ];

  attivitaSelezionate: any [] = [];

  constructor() {}

  aggiungiAttivitaSelezionata(attivita: any){
    if(!this.attivitaSelezionate.includes(attivita)){
      this.attivitaSelezionate.push(attivita);
    }
  }

  rimuoviAttivitaSelezionata(attivita: any){
    const index = this.attivitaSelezionate.indexOf(attivita);
    if (index !== -1) {
      this.attivitaSelezionate.splice(index, 1);
    }
  }
}
