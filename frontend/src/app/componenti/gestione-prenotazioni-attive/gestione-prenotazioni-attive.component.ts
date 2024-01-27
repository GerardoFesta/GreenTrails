import { PrenotazioniAttivitaTuristicheService } from './../../servizi/prenotazioni-attivita-turistiche.service';
import { PrenotazioniAlloggiService } from './../../servizi/prenotazioni-alloggi.service';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Component} from '@angular/core';


@Component({
  selector: 'app-gestione-prenotazioni-attive',
  templateUrl: './gestione-prenotazioni-attive.component.html',
  styleUrls: ['./gestione-prenotazioni-attive.component.css']
})

export class GestionePrenotazioniAttiveComponent {
onDelete(_t99: any) {
throw new Error('Method not implemented.');
}
updatePaginatedData() {
throw new Error('Method not implemented.');
}

  prenotazioniAttivita: any[]=[];
  prenotazioniAlloggio: any[]=[];
  displayedColumns: string[] = ['stato', 'id', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', 'actions'];
  dataSource = new MatTableDataSource<any>();
  mostraSoloInCorso: boolean = false;
 pageSize:number = 5;
  

  constructor(
    private prenotazioniAlloggiService: PrenotazioniAlloggiService,
    private prenotazioniAttivitaTurService: PrenotazioniAttivitaTuristicheService
  ) {}

  ngOnInit(): void {
    this.getPrenotazioniAlloggio();
    this.getPrenotazioniAttivita();
  }

  getPrenotazioniAlloggio() {
    this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore().subscribe(
      (response: any) => {
        this.prenotazioniAlloggio = response;
        this.populateTable();
        console.log('Prenotazioni Alloggio:', this.prenotazioniAlloggio);
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni alloggio:', error);
      }
    );
  }

  getPrenotazioniAttivita() {
    this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore().subscribe(
      (response: any) => {
        this.prenotazioniAttivita = response;
        this.populateTable();
        console.log('Prenotazioni Attività:', this.prenotazioniAttivita);
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni attività:', error);
      }
    );
  }

  toggleMostraSoloInCorso() {
    this.mostraSoloInCorso = !this.mostraSoloInCorso;
    this.populateTable();
  }

  populateTable() {
    const tutteLePrenotazioni = [...this.prenotazioniAlloggio, ...this.prenotazioniAttivita];
    
    const prenotazioniFiltrate = this.mostraSoloInCorso
      ? tutteLePrenotazioni.filter(prenotazione => prenotazione.stato === 'IN_CORSO')
      : tutteLePrenotazioni;

    this.dataSource.data = prenotazioniFiltrate;
  }
  // onDelete(prenotazione: GestionePrenotazioniAttiveComponent){
  //   if(prenotazione.stato.toLowerCase() === 'attivo'){
  //     this.prenotazioniAlloggiService.deletePrenotazioneAlloggio(prenotazione.id).subscribe(
  //       () => {
  //         this.visualizzaPrenotazioniAlloggio();
  //   });
  //   } else {
  //     this.prenotazioniAttivitaTurService.deletePrenotazioneAttivitaTuristica(prenotazione.id).subscribe(
  //       () => {
  //         this.visualizzaPrenotazioniAttivitaTur();
  //       });
  //   }
  //   console.log('Prenotazione eliminata con successo');
  // }
}