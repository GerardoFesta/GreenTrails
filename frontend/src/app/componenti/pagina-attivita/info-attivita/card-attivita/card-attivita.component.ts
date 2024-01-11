import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-attivita',
  templateUrl: './card-attivita.component.html',
  styleUrls: ['./card-attivita.component.css']
})
export class CardAttivitaComponent implements OnInit {

  nomeAttivita: string = 'nome_attivita';
  immagine_attivita: string = 'https://www.hotelkennedy.org/static/f9f7a02b44b26255144bc1b4086fbd1e/5267c/e825f4c8-e7d7-4693-9895-b012d2879684.jpg';
  

  constructor() { }

  ngOnInit(): void {
  }

}
