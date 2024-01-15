import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-descrizione-attivita',
  templateUrl: './descrizione-attivita.component.html',
  styleUrls: ['./descrizione-attivita.component.css']
})
export class DescrizioneAttivitaComponent implements OnInit {

  attivita?: Attivita;

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    this.attivitaService.ottieniAttivitaCondivisa().subscribe(
      (attivita: Attivita | null) => {
        this.attivita = attivita!;
        console.log(attivita);
      }
    )
  }

}
