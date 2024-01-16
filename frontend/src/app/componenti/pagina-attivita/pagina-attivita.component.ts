import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-pagina-attivita',
  templateUrl: './pagina-attivita.component.html',
  styleUrls: ['./pagina-attivita.component.css']
})

export class PaginaAttivitaComponent implements OnInit {

  // attivita?: Attivita;
  attivita?: Attivita[];

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    // this.visualizzaDettagliAttivita(10);
    this.attivitaService.getListaAttivita().subscribe((data: Attivita[]) => {
      this.attivita = data;
      console.log(this.attivita);
    })
  }

  // visualizzaDettagliAttivita(id: number): void {
  //   this.attivitaService.visualizzaAttivita(id).subscribe(
  //     (attivita: Attivita) => {
  //       console.log('Dettagli dell\'attività:', attivita);
  //       this.attivita = attivita;
  //       this.attivitaService.inviaAttivita(attivita);
  //     },
  //     (errore) => {
  //       console.error('Errore durante il recupero dei dettagli dell\'attività:', errore);
  //     }
  //   );
  // }
  

  

}
