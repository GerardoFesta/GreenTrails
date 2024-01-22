import { Component, Input, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-valutazione-attivita',
  templateUrl: './valutazione-attivita.component.html',
  styleUrls: ['./valutazione-attivita.component.css'],
  providers: [NgbRatingConfig],
})
export class ValutazioneAttivitaComponent {

  ngOnInit() {
  }

  constructor(config: NgbRatingConfig) {
    config.max = 5;
		config.readonly = true;
  }

}
