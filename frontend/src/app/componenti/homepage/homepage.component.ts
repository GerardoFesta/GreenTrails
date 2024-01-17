import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  listaAttivita?: Attivita[];

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    // this.getListaAttivita();
  }

  // getListaAttivita() {
  //   this.attivitaService.getListaAttivita().subscribe((data: Attivita[]) => {
  //     this.listaAttivita = data;
  //     console.log(this.listaAttivita);
  //   })
  // }

}
