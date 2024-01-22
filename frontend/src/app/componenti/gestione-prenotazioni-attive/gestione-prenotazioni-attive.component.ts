import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDateFormats } from '@angular/material/core';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

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
  { stato: 'attivo', nome: 'Prenotazione Attiva 1', check_in: new Date('2024-01-01'), check_out: new Date('2024-01-10'), bambini: 2, adulti: 1, prezzo: 120.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 2', check_in: new Date('2024-02-01'), check_out: new Date('2024-02-10'), bambini: 1, adulti: 2, prezzo: 150.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 3', check_in: new Date('2024-03-01'), check_out: new Date('2024-03-05'), bambini: 3, adulti: 2, prezzo: 180.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 1', check_in: new Date('2024-04-01'), check_out: new Date('2024-04-03'), bambini: 1, adulti: 1, prezzo: 80.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 2', check_in: new Date('2024-05-01'), check_out: new Date('2024-05-07'), bambini: 2, adulti: 3, prezzo: 120.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 3', check_in: new Date('2024-06-01'), check_out: new Date('2024-06-10'), bambini: 1, adulti: 2, prezzo: 100.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 1', check_in: new Date('2024-01-01'), check_out: new Date('2024-01-10'), bambini: 2, adulti: 1, prezzo: 120.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 2', check_in: new Date('2024-02-01'), check_out: new Date('2024-02-10'), bambini: 1, adulti: 2, prezzo: 150.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 3', check_in: new Date('2024-03-01'), check_out: new Date('2024-03-05'), bambini: 3, adulti: 2, prezzo: 180.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 1', check_in: new Date('2024-04-01'), check_out: new Date('2024-04-03'), bambini: 1, adulti: 1, prezzo: 80.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 2', check_in: new Date('2024-05-01'), check_out: new Date('2024-05-07'), bambini: 2, adulti: 3, prezzo: 120.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 3', check_in: new Date('2024-06-01'), check_out: new Date('2024-06-10'), bambini: 1, adulti: 2, prezzo: 100.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 1', check_in: new Date('2024-01-01'), check_out: new Date('2024-01-10'), bambini: 2, adulti: 1, prezzo: 120.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 2', check_in: new Date('2024-02-01'), check_out: new Date('2024-02-10'), bambini: 1, adulti: 2, prezzo: 150.0 },
  { stato: 'attivo', nome: 'Prenotazione Attiva 3', check_in: new Date('2024-03-01'), check_out: new Date('2024-03-05'), bambini: 3, adulti: 2, prezzo: 180.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 1', check_in: new Date('2024-04-01'), check_out: new Date('2024-04-03'), bambini: 1, adulti: 1, prezzo: 80.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 2', check_in: new Date('2024-05-01'), check_out: new Date('2024-05-07'), bambini: 2, adulti: 3, prezzo: 120.0 },
  { stato: 'completo', nome: 'Prenotazione Completa 3', check_in: new Date('2024-06-01'), check_out: new Date('2024-06-10'), bambini: 1, adulti: 2, prezzo: 100.0 },
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

  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }

  

  displayedColumns: string[] = ['stato', 'nome', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', "actions"];
  Prenotazione: any;
  dataSource = new MatTableDataSource<Prenotazione>(Prenotazione.slice(0, 10));

  showActiveOnly: boolean = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  onDelete(prenotazione: Prenotazione) {
    console.log(`Deleting: ${prenotazione.nome}`);
  }
  ngOnInit() {
    this.updatePaginatedData();
  }
  


  get slicedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.data.slice(startIndex, endIndex);
  }

  length = Prenotazione.length;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedData();
    });
  }
  updatePaginatedData() {
    const startIndex: number = this.pageIndex * this.pageSize;
    const endIndex: number = startIndex + this.pageSize;
    this.dataSource.data = Prenotazione.slice(startIndex, endIndex);
  }
  get filteredData() {
    const filteredData = this.showActiveOnly
      ? this.dataSource.data.filter(prenotazione => prenotazione.stato.toLowerCase() === 'attivo')
      : this.dataSource.data;
    return filteredData;
  }
}
