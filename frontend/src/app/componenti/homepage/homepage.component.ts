import { Component, OnInit } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  listaAttivita?: any;

  limite: number = 0;

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    this.visualizzaAttivitaPerPrezzo(0);
  }

  visualizzaAttivitaPerPrezzo(limite: number) {
    this.attivitaService.visualizzaAttivitaPerPrezzo(limite).subscribe((risposta) => {
      console.log(risposta);
    })
  }

}
