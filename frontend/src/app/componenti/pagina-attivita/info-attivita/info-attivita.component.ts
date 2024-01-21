import { PrenotazioniService } from './../../../servizi/prenotazioni.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-attivita',
  templateUrl: './info-attivita.component.html',
  styleUrls: ['./info-attivita.component.css']
})
export class InfoAttivitaComponent implements OnInit {

  @Input() attivita?: any;


  constructor() { }

  ngOnInit(): void {
  }

  


}
