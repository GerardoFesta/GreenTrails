import { PrenotazioniAttivitaTuristicheService } from './../../servizi/prenotazioni-attivita-turistiche.service';
import { PrenotazioniAlloggiService } from './../../servizi/prenotazioni-alloggi.service';
import { CookieService } from 'ngx-cookie-service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { $localize } from '@angular/localize/init';
import { Component,  ViewChild } from '@angular/core';


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

  prenotazioniAlloggioList: any [] = [];
  prenotazioniAttivitaTurList: any [] = [];
  prenotazioniListaTotale: any [] = [];

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

  displayedColumns: string[] = ['stato', 'nome', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', 'actions'];
  dataSource = new MatTableDataSource<Prenotazione>();

  showActiveOnly: boolean = false;
  idVisitatore: string = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const idVisitatoreFromCookie = this.cookie.get('userId');
  
      if (idVisitatoreFromCookie) {
        this.idVisitatore = idVisitatoreFromCookie;
        console.log('Id visitatore', this.idVisitatore);

        Promise.all([
          this.visualizzaPrenotazioniAlloggio(),
          this.visualizzaPrenotazioniAttivitaTur()
        ]).then(() => {
          console.log('prenotazioni alloggio: ', this.prenotazioniAlloggioList);
          console.log('prenotazioni attivita turistica:', this.prenotazioniAttivitaTurList);
          this.updatePaginatedData(); 
      
        });
      } else {
        console.error('idVisitatore not found in the cookie');
      }   
  }

  visualizzaPrenotazioniAlloggio(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore(this.idVisitatore).subscribe((result: any) => {
        const newPrenotazioniAlloggio = Array.isArray(result) ? result: Object.values(result || {}) as Prenotazione[];
        this.prenotazioniAlloggioList.push(...newPrenotazioniAlloggio);
        resolve()
      })
    })
  }

  visualizzaPrenotazioniAttivitaTur(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore(this.idVisitatore).subscribe((result: any) => {
        const newPrenotazioniAttivita = Array.isArray(result) ? result : Object.values(result || {}) as Prenotazione[];
        this.prenotazioniAttivitaTurList.push(...newPrenotazioniAttivita);
        resolve();
      });
    });
  }

  /*sortByData(array: any[]): any[] {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => {
      const dateA = new Date(a.check_in).getTime();
      const dateB = new Date(b.check_in).getTime();
      return dateA - dateB;
    });
    return sortedArray;
  */
  
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
          this.visualizzaPrenotazioniAlloggio();
    });
    } else {
      this.prenotazioniAttivitaTurService.deletePrenotazioneAttivitaTuristica(prenotazione.id).subscribe(
        () => {
          this.visualizzaPrenotazioniAttivitaTur();
        });
    }
    console.log('Prenotazione eliminata con successo');
  }
}