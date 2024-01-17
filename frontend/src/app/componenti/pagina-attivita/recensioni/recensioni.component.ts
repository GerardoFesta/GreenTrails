import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recensioni',
  templateUrl: './recensioni.component.html',
  styleUrls: ['./recensioni.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioniComponent implements OnInit {

  constructor(config: NgbRatingConfig) {
    config.max = 5;
		config.readonly = true;
   }

  ngOnInit(): void {
  }

}
