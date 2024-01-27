import { SegnalazioneService } from './../../servizi/segnalazione.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

export interface Segnalazione {
  numero: number;
  idUtente: string;
  idAttivita: string;
  descrizione: string;
}

@Component({
  selector: 'app-lista-segnalazioni',
  templateUrl: './lista-segnalazioni.component.html',
  styleUrls: ['./lista-segnalazioni.component.css']
})
export class ListaSegnalazioniComponent implements OnInit {

  listaSegnalazione: Segnalazione[] = [
    { numero: 0, idUtente: '', idAttivita: '', descrizione: '' },
  ];

  sortedData: Segnalazione[] = [];
  idAttivita: number = 0;

  constructor(private segnalazioneService: SegnalazioneService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.visualizzaSegnalazioni();
  }

  sortData(sort: Sort) {
    const data = this.listaSegnalazione.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numero':
          return this.compare(a.numero, b.numero, isAsc);
        case 'idUtente':
          return this.compare(a.idUtente, b.idUtente, isAsc);
        case 'idAttivita':
          return this.compare(a.idAttivita, b.idAttivita, isAsc);
        case 'descrizione':
          return this.compare(a.descrizione, b.descrizione, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === "number" && typeof b === "number") {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    } else if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b) * (isAsc ? 1 : -1);
    } else {
      return 0;
    }
  }

  visualizzaSegnalazioni() {
    this.segnalazioneService.recuperoSegnalazioni(false).subscribe((risposta) => {
      console.log("Segnalazioni risposta:", risposta);
        this.listaSegnalazione = risposta.data.map((segnalazione: any, index: any) => ({
          numero: index + 1,
          idUtente: segnalazione.utente.email,
          idAttivita: segnalazione.attivita.nome,
          descrizione: segnalazione.descrizione,
        }));
        console.log("listaSegnalazione:", this.listaSegnalazione);
        this.sortedData = this.listaSegnalazione.slice();
    });
  }

  modifica(){
    
  }
 
}
