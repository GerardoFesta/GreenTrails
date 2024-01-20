import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecensioneService } from 'src/app/servizi/recensione.service';

@Component({
  selector: 'app-valutazione-attivita',
  templateUrl: './valutazione-attivita.component.html',
  styleUrls: ['./valutazione-attivita.component.css'],
  providers: [NgbRatingConfig],
})
export class ValutazioneAttivitaComponent {

  idAttivita: number = 0;
  rating: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idAttivita = +params['id'];
    })

    this.calcolaMediaRecensioni();
  }

  constructor(config: NgbRatingConfig, private recensioneService: RecensioneService, private route: ActivatedRoute) {
    config.max = 5;
		config.readonly = true;
  }

  calcolaMediaRecensioni(): void {
    this.recensioneService.visualizzaRecensioniPerAttivita(this.idAttivita).subscribe((risposta) => {
      if (risposta.data && risposta.data.length > 0) {
        const sommaValutazioni = risposta.data.reduce((acc: any, recensione: any) => acc + recensione.valutazioneStelleEsperienza, 0);
        this.rating = Math.floor(sommaValutazioni / risposta.data.length);
        console.log("Media delle valutazioni:", this.rating);
      } else {
        console.log("Nessuna recensione disponibile per calcolare la media.");
      }
    });
  }
}
