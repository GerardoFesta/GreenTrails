import { PrenotazioniAttivitaTuristicheService } from './../../servizi/prenotazioni-attivita-turistiche.service';
import { PrenotazioniAlloggiService } from './../../servizi/prenotazioni-alloggi.service';
import { CookieService } from 'ngx-cookie-service';

import { MatDateFormats } from '@angular/material/core';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, forkJoin } from 'rxjs';
import { $localize } from '@angular/localize/init';
import { Component, ViewChild } from '@angular/core';


export interface Prenotazione {
  id: number;
  stato: String;
  nome: String;
  check_in: Date;
  check_out: Date;
  bambini: number;
  adulti: number;
  prezzo: number;
}

/*
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
*/

@Component({
  selector: 'app-gestione-prenotazioni-attive',
  templateUrl: './gestione-prenotazioni-attive.component.html',
  styleUrls: ['./gestione-prenotazioni-attive.component.css']
})

export class GestionePrenotazioniAttiveComponent {

  changes = new Subject<void>();

  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  prenotazione: Prenotazione[] = [];

  constructor(
    private cookie: CookieService,
    private prenotazioniAlloggiService: PrenotazioniAlloggiService,
    private prenotazioniAttivitaTurService: PrenotazioniAttivitaTuristicheService,
  ) { }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }



  displayedColumns: string[] = ['stato', 'nome', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', "actions"];
  Prenotazione: any;
  dataSource = new MatTableDataSource<Prenotazione>();

  showActiveOnly: boolean = false;
  idVisitatore: string = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const idVisitatoreFromCookie = this.cookie.get('idVisitatore');
  
      if (idVisitatoreFromCookie) {
        this.idVisitatore = idVisitatoreFromCookie;
        console.log('Id visitatore', this.idVisitatore);
  
        this.getPrenotazioni();
      } else {
        console.error('idVisitatore not found in the cookie');
      }
  }

  getPrenotazioni(){
    const prenotazioniAlloggi$ = this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore(this.idVisitatore);
    const prenotazioniAttivita$ = this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore(this.idVisitatore);
    forkJoin([prenotazioniAlloggi$, prenotazioniAttivita$]).subscribe(([prenotazioniAlloggi, prenotazioniAttivita]) =>{
      const prenotazioni = [...prenotazioniAlloggi, ...prenotazioniAttivita];
      prenotazioni.sort((a, b) => a.check_in.getTime() - b.check_in.getTime());
      this.dataSource.data = prenotazioni;
      this.updatePaginatedData();
    });
  }
    


  get slicedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.data.slice(startIndex, endIndex);
  }

  length = this.dataSource.data.length;
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
    this.dataSource.data = this.dataSource.data.slice(startIndex, endIndex);
  }
  get filteredData() {
    const filteredData = this.showActiveOnly
      ? this.dataSource.data.filter(prenotazione => prenotazione.stato.toLowerCase() === 'attivo')
      : this.dataSource.data;
    return filteredData;
  }

  onDelete(prenotazione: Prenotazione){
    if(prenotazione.stato.toLowerCase() === 'attivo'){
      this.prenotazioniAlloggiService.deletePrenotazioneAlloggio(prenotazione.id).subscribe(
        () => {
          this.getPrenotazioni();
    });
    } else {
      this.prenotazioniAttivitaTurService.deletePrenotazioneAttivitaTuristica(prenotazione.id).subscribe(
        () => {
          this.getPrenotazioni();
        });
    }
  }
}
