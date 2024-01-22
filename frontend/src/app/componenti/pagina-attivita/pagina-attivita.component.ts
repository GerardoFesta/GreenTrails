import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attivita } from 'src/app/classi/attivita';
import { Recensione } from 'src/app/classi/recensione';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { RecensioneService } from 'src/app/servizi/recensione.service';

@Component({
  selector: 'app-pagina-attivita',
  templateUrl: './pagina-attivita.component.html',
  styleUrls: ['./pagina-attivita.component.css']
})

export class PaginaAttivitaComponent implements OnInit {

  attivita?: Attivita;
  isAttivita?: boolean;
  listaRecensioni?: Recensione[];

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private recensioneService: RecensioneService) { }

  ngOnInit(): void {
    this.visualizzaDettagliAttivita();
    // this.visualizzaValutazioneAttivita();
  }
  
  visualizzaDettagliAttivita(): void {
    const id: number = +this.route.snapshot.params['id'];

    this.attivitaService.visualizzaAttivita(id).subscribe((data) => {
      this.attivita = data;
      console.log(this.attivita.coordinate);
    }, (error) => {
      console.error(error);
    })
  }

  // visualizzaValutazioneAttivita(): void {
  //   const id = this.route.snapshot.params['id'];

  //   this.recensioneService.visualizzaRecensioniPerAttivita(id).subscribe((data) => {
  //     this.listaRecensioni = data;
  //     console.log(this.listaRecensioni);
  //   })
  // }
}
