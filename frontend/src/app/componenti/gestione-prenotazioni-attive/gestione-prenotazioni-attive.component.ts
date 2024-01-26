import { PrenotazioniAttivitaTuristicheService } from './../../servizi/prenotazioni-attivita-turistiche.service';
import { PrenotazioniAlloggiService } from './../../servizi/prenotazioni-alloggi.service';
import { CookieService } from 'ngx-cookie-service';

import { MatDateFormats } from '@angular/material/core';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, forkJoin } from 'rxjs';
import { $localize } from '@angular/localize/init';
import { ChangeDetectorRef, Component, NgZone, ViewChild } from '@angular/core';


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

  prenotazione: Prenotazione[] = [];

  constructor(
    private cookie: CookieService,
    private prenotazioniAlloggiService: PrenotazioniAlloggiService,
    private prenotazioniAttivitaTurService: PrenotazioniAttivitaTuristicheService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
  ) { }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }



  displayedColumns: string[] = ['stato', 'nome', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', "actions"];
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
  
        this.getPrenotazioni();
      } else {
        console.error('idVisitatore not found in the cookie');
      }
  }

  getPrenotazioni(){
    const prenotazioniAlloggi$ = this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore(this.idVisitatore);
    const prenotazioniAttivita$ = this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore(this.idVisitatore);
    forkJoin([prenotazioniAlloggi$, prenotazioniAttivita$]).subscribe(([prenotazioniAlloggi, prenotazioniAttivita]) => {
      this.zone.run(() => {
        const prenotazioniAlloggiArray = Array.isArray(prenotazioniAlloggi)
          ? prenotazioniAlloggi as Prenotazione[]
          : Object.values(prenotazioniAlloggi || {}) as Prenotazione[];
        const prenotazioniAttivitaArray = Array.isArray(prenotazioniAttivita)
          ? prenotazioniAttivita as Prenotazione[]
          : Object.values(prenotazioniAttivita || {}) as Prenotazione[];
  
        console.log('Prenotazioni Alloggi:', prenotazioniAlloggi);
        console.log('Prenotazioni Attività Turistiche:', prenotazioniAttivita);
  
        const prenotazioni = [...prenotazioniAlloggiArray, ...prenotazioniAttivitaArray];
        console.log('Prenotazioni finali:', prenotazioni);
        this.dataSource.data = prenotazioni;
        this.updatePaginatedData();
        this.changes.next();
        this.cdr.detectChanges();
      });
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
    console.log('ngAfterViewInit called');
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
