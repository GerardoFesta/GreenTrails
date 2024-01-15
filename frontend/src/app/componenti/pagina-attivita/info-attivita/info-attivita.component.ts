import { Component, OnInit } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-info-attivita',
  templateUrl: './info-attivita.component.html',
  styleUrls: ['./info-attivita.component.css']
})
export class InfoAttivitaComponent implements OnInit {

  constructor() { }

  userRating: number = 3;

  ngOnInit(): void {
  }

}
