import { Component, OnInit } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Prenotazione {
  stato: String;
  nome: String;
  check_in: Date;
  check_out: Date;
  bambini: number;
  adulti: number;
  prezzo: number;
}

const Prenotazione: Prenotazione[] = [
  { stato: 'attivo', nome: 'Prenotazione Attiva 1', check_in: new Date('2024-01-01'), check_out: new Date('2024-01-10'), bambini: 2, adulti: 1, prezzo: 120.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 2', check_in: new Date('2024-02-01'), check_out: new Date('2024-02-10'), bambini: 1, adulti: 2, prezzo: 150.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 3', check_in: new Date('2024-03-01'), check_out: new Date('2024-03-05'), bambini: 3, adulti: 2, prezzo: 180.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 1', check_in: new Date('2024-04-01'), check_out: new Date('2024-04-03'), bambini: 1, adulti: 1, prezzo: 80.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 2', check_in: new Date('2024-05-01'), check_out: new Date('2024-05-07'), bambini: 2, adulti: 3, prezzo: 120.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 3', check_in: new Date('2024-06-01'), check_out: new Date('2024-06-10'), bambini: 1, adulti: 2, prezzo: 100.0 },
];

@Component({
  selector: 'app-gestione-prenotazioni-attive',
  templateUrl: './gestione-prenotazioni-attive.component.html',
  styleUrls: ['./gestione-prenotazioni-attive.component.css']
})

export class GestionePrenotazioniAttiveComponent {

  displayedColumns: string[] = ['stato', 'nome', 'check-in', 'check-out', 'bambini', 'adulti','prezzo'];
  dataSource = new MatTableDataSource<Prenotazione>(Prenotazione);
showActiveOnly: boolean = false;

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

get filteredData() {
  return this.showActiveOnly
    ? this.dataSource.filteredData.filter(prenotazione => prenotazione.stato.toLowerCase() === 'attivo')
    : this.dataSource.filteredData;
}
onDelete(prenotazione: Prenotazione) {
  // Implement your delete logic here
  console.log(`Deleting: ${prenotazione.nome}`);
}

}
