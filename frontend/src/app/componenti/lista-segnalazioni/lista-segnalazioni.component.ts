import { SegnalazioneService } from './../../servizi/segnalazione.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';


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

  sortedData: Segnalazione[];
  idAttivita: number = 0;
  filterTerm: string = '';

  constructor(private segnalazioneService: SegnalazioneService, private dialog: MatDialog) {
    this.sortedData = this.listaSegnalazione.slice();
  }

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
    this.segnalazioneService.recuperoSegnalazioni().subscribe((risposta) => {
      console.log("Segnalazioni: ", risposta);
      this.listaSegnalazione = risposta.map((segnalazione: any, index: any) => ({
        numero: index + 1,
        idUtente: segnalazione.idUtente,
        idAttivita: segnalazione.idAttivita,
        descrizione: segnalazione.descrizione,
      }));
      this.sortedData = this.listaSegnalazione.slice();
    });
  }

  // Metodo di filtro personalizzato
  filterData(segnalazione: Segnalazione): boolean {
    const searchTerm = this.filterTerm.toLowerCase();
    return segnalazione.idUtente.toLowerCase().includes(searchTerm) ||
           segnalazione.idAttivita.toLowerCase().includes(searchTerm);
  }
}
