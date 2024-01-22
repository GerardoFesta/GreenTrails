import { Component, Input, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';

@Component({
  selector: 'app-info-attivita',
  templateUrl: './info-attivita.component.html',
  styleUrls: ['./info-attivita.component.css']
})
export class InfoAttivitaComponent implements OnInit {

  @Input() attivita?: Attivita;

  constructor() { }

  ngOnInit(): void {
  }

}
