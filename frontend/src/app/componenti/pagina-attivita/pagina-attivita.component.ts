import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { RecensioneService } from 'src/app/servizi/recensione.service';

@Component({
  selector: 'app-pagina-attivita',
  templateUrl: './pagina-attivita.component.html',
  styleUrls: ['./pagina-attivita.component.css']
})

export class PaginaAttivitaComponent implements OnInit {

  attivita?: any;
  id: number = 0;

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, private recensioneService: RecensioneService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.visualizzaDettagliAttivita();
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.id).subscribe((attivita) => {
      this.attivita = attivita.data;
    }, (error) => {
      console.error(error);
    })
  }
}
