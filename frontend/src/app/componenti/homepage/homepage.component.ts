import { Component, OnInit } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  listaAttivita?: any;

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    this.getListaAttivita();
  }

  getListaAttivita() {
    this.attivitaService.findAllAttivita().subscribe((listaAttivita: any) => {
      this.listaAttivita = listaAttivita.data;
    })
  }

}
