import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descrizione-attivita',
  templateUrl: './descrizione-attivita.component.html',
  styleUrls: ['./descrizione-attivita.component.css']
})
export class DescrizioneAttivitaComponent implements OnInit {

  @Input() attivita?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
