import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { PopupEliminazioneComponent } from './popup-eliminazione/popup-eliminazione.component';

export interface Attivita {
  numero: number;
  nome: string;
  categoria: string;
}

@Component({
  selector: 'app-gestione-attivita',
  templateUrl: './gestione-attivita.component.html',
  styleUrls: ['./gestione-attivita.component.css']
})
export class GestioneAttivitaComponent implements OnInit {

  listaAttivita: Attivita[] = [
    { numero: 0, nome: '', categoria: '' },
  ];

  sortedData: Attivita[];
  idAttivita: number = 0;

  createAttivita() {
    throw new Error('Method not implemented.');
  }

  filterTerm!: string;

  constructor(private attivitaService: AttivitaService, private dialog: MatDialog) {
    this.sortedData = this.listaAttivita.slice();
  }

  ngOnInit(): void {
    this.visualizzaAttivitaPerGestore();
  }

  sortData(sort: Sort) {
    const data = this.listaAttivita.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'numero':
          return this.compare(a.numero, b.numero, isAsc);
        case 'nome':
          return this.compare(a.nome, b.nome, isAsc);
        case 'categoria':
          return this.compare(a.categoria, b.categoria, isAsc);
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

  visualizzaAttivitaPerGestore() {
    this.attivitaService.visualizzaAttivitaPerGestore().subscribe((risposta) => {
      console.log("Attività per gestore: ", risposta);
      this.listaAttivita = risposta.data.map((attivita: any, index: any) => ({
        numero: index + 1,
        nome: attivita.nome,
        categoria: attivita.alloggio ? 'Alloggio' : 'Attività Turistica'
      }));
      this.sortedData = this.listaAttivita.slice();
    })
  }

  edit() {

  }

  delete(): void {
    const dialogRef = this.dialog.open(PopupEliminazioneComponent, {
      width: '250px',
      data: { message: 'Sei sicuro di voler eliminare questa attività?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attivitaService.cancellaAttivita(15).subscribe((risposta) => {
          console.log("Eliminazione attività: ", risposta)
        })
      }
    }, (error) => {
      console.log(error)
    });
  }
}