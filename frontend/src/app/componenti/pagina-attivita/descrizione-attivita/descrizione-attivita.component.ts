import { Component, Input, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';

@Component({
  selector: 'app-descrizione-attivita',
  templateUrl: './descrizione-attivita.component.html',
  styleUrls: ['./descrizione-attivita.component.css']
})
export class DescrizioneAttivitaComponent implements OnInit {

  @Input() attivita?: Attivita;

  constructor() { }

  ngOnInit(): void {
  }

}
