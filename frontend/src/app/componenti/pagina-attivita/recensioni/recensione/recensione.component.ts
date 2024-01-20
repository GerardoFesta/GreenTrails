import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css']
})
export class RecensioneComponent implements OnInit {

  @Input() recensione: any;

  constructor() { }

  ngOnInit(): void {
  }

}
