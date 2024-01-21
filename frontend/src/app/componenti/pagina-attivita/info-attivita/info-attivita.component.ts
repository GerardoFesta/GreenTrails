import { Component, OnInit } from '@angular/core';

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
