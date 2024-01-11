import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-politiche-ecosostenibili-attivita',
  templateUrl: './politiche-ecosostenibili-attivita.component.html',
  styleUrls: ['./politiche-ecosostenibili-attivita.component.css']
})
export class PoliticheEcosostenibiliAttivitaComponent implements OnInit {

  politicheEcosostenibili: string[];

  constructor() { 
    this.politicheEcosostenibili = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  }

  ngOnInit(): void {
  }

}
