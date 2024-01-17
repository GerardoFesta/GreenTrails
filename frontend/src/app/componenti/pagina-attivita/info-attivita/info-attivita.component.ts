import { Component, Input, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-info-attivita',
  templateUrl: './info-attivita.component.html',
  styleUrls: ['./info-attivita.component.css']
})
export class InfoAttivitaComponent implements OnInit {

  @Input() attivita?: Attivita;

  constructor() { }

  userRating: number = 3;

  ngOnInit(): void {
  }

}
