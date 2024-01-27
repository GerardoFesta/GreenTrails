import { PrenotazioniAttivitaTuristicheService } from './../../servizi/prenotazioni-attivita-turistiche.service';
import { PrenotazioniAlloggiService } from './../../servizi/prenotazioni-alloggi.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Component} from '@angular/core';
import { PopupDeleteConfermaComponent } from './popupDeleteConferma/popupDeleteConferma.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-gestione-prenotazioni-attive',
  templateUrl: './gestione-prenotazioni-attive.component.html',
  styleUrls: ['./gestione-prenotazioni-attive.component.css']
})

export class GestionePrenotazioniAttiveComponent {
openPopup(_t107: any) {
throw new Error('Method not implemented.');
}
  idalloggio: any;
  idAttivita: any;
  mostraSoloInCorso: boolean = false; 


updatePaginatedData() {
throw new Error('Method not implemented.');
}

  prenotazioniAttivita: any[]=[];
  prenotazioniAlloggio: any[]=[];
  displayedColumns: string[] = ['stato', 'id', 'check-in', 'check-out', 'bambini', 'adulti', 'prezzo', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  pageSize:number = 5;
  

  constructor(
    private prenotazioniAlloggiService: PrenotazioniAlloggiService,
    private prenotazioniAttivitaTurService: PrenotazioniAttivitaTuristicheService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.populateTable();
  }

  getPrenotazioniAlloggio() {
    this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore().subscribe(
      (response: any) => {
        this.prenotazioniAlloggio = response;
  
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach((prenotazione: any) => {
            const dataInizio = prenotazione.dataInizio;
            const dataFine = prenotazione.dataFine;
            const id = prenotazione.id;
            const stato = prenotazione.stato;
            const numAdulti = prenotazione.numAdulti;
            const numBambini = prenotazione.numBambini;
            const prezzo = prenotazione.prezzo;
  
            console.log('Data Inizio:', dataInizio);
            console.log('Data Fine:', dataFine);
            console.log('ID:', id);
            console.log('Num Adulti:', numAdulti);
            console.log('Stato:', stato);
            console.log('Num Bambini:', numBambini);
            console.log('Prezzo:', prezzo);
            console.log('---'); 
          });
        }
  
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
  
        if (response.data && Array.isArray(response.data)) {
          response.data.forEach((attivita: any) => {
            const visitatore = attivita.nome
            const idAttivita = attivita.id;
            const prezzo = attivita.prezzo;
            const stato = attivita.stato;
            const numBambini = attivita.numBambini;
            const numAdulti = attivita.numAdulti;
            const dataInizio = attivita.dataInizio;
            const dataFine = attivita.dataFine;
  
            console.log('ID Attività:', idAttivita);
            console.log('Prezzo:', prezzo);
            console.log('Stato:', stato);
            console.log('Num Bambini:', numBambini);
            console.log('Num Adulti:', numAdulti);
            console.log('Data Inizio:', dataInizio);
            console.log('Data Fine:', dataFine);

            // Log other properties if needed
          });
  
          console.log('Prenotazioni Attività:', this.prenotazioniAttivita);
        } else {
          console.error('Invalid data structure:', response.data);
        }
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni attività:', error);
      }
    );
  }
  populateTable() {
    forkJoin({
      prenotazioniAlloggio: this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore(),
      prenotazioniAttivita: this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore(),
    }).subscribe(
      (responses: any) => {
        const prenotazioniAlloggio = responses.prenotazioniAlloggio.data;
        const prenotazioniAttivita = responses.prenotazioniAttivita.data;
        console.log("alloggio",prenotazioniAlloggio)
        console.log("attivita",prenotazioniAttivita)
  
        const mergedData = [...prenotazioniAlloggio, ...prenotazioniAttivita];
  
        const mappedData = mergedData.map(item => ({
          id: item.id,
          stato: item.stato,  
          checkIn: item.dataInizio,
          checkOut: item.dataFine,
          bambini: item.numBambini,
          adulti: item.numAdulti,
          prezzo: item.prezzo,
        }));
  
        this.dataSource.data = mappedData;
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni:', error);
      }
    );
  }
  
  getPrenotazioni() {
    // Combine both service calls using forkJoin
    forkJoin({
      prenotazioniAlloggio: this.prenotazioniAlloggiService.getPrenotazioniAlloggioVisitatore(),
      prenotazioniAttivita: this.prenotazioniAttivitaTurService.getPrenotazioniAttivitaTuristicaVisitatore(),
    }).subscribe(
      (responses: any) => {
        this.prenotazioniAlloggio = responses.prenotazioniAlloggio;
        this.prenotazioniAttivita = responses.prenotazioniAttivita;
  
        // Process prenotazioniAlloggio
        if (Array.isArray(this.prenotazioniAlloggio) && this.prenotazioniAlloggio.length > 0) {
          console.log('Prenotazioni Alloggio:');
          this.prenotazioniAlloggio.forEach((prenotazione: any) => {
            if (prenotazione.data && Array.isArray(prenotazione.data)) {
              prenotazione.data.forEach((item: any) => {
                const dataInizio = item.dataInizio;
                const dataFine = item.dataFine;
                const id = item.id;
                const stato = item.stato;
                const numAdulti = item.numAdulti;
                const numBambini = item.numBambini;
                const prezzo = item.prezzo;
  
                console.log('Data Inizio:', dataInizio);
                console.log('Data Fine:', dataFine);
                console.log('ID:', id);
                console.log('Num Adulti:', numAdulti);
                console.log('Stato:', stato);
                console.log('Num Bambini:', numBambini);
                console.log('Prezzo:', prezzo);
                console.log('---');
              });
            }
          });
        }
  
        // Process prenotazioniAttivita
        if (Array.isArray(this.prenotazioniAttivita) && this.prenotazioniAttivita.length > 0) {
          console.log('Prenotazioni Attività:');
          this.prenotazioniAttivita.forEach((attivita: any) => {
            if (attivita.data && Array.isArray(attivita.data)) {
              attivita.data.forEach((item: any) => {
                const idAttivita = item.id;
                const prezzo = item.prezzo;
                const stato = item.stato;
                const numBambini = item.numBambini;
                const numAdulti = item.numAdulti;
                const dataInizio = item.dataInizio;
                const dataFine = item.dataFine;
  
                console.log('ID Attività:', idAttivita);
                console.log('Prezzo:', prezzo);
                console.log('Stato:', stato);
                console.log('Num Bambini:', numBambini);
                console.log('Num Adulti:', numAdulti);
                console.log('Data Inizio:', dataInizio);
                console.log('Data Fine:', dataFine);
                console.log('---');
              });
            }
          });
        }
  
      },
      error => {
        console.error('Errore nel recupero delle prenotazioni:', error);
      }
    );
  }
  
  

  toggleMostraSoloInCorso() {
    this.mostraSoloInCorso = !this.mostraSoloInCorso;
  }


  

  updateTable(): void {
    this.getPrenotazioni(); // You can replace this with any method that fetches the updated data
    this.dataSource.data = [...this.prenotazioniAlloggio, ...this.prenotazioniAttivita];
  }
  // deletePrenotazione(prenotazione: any): void {
  //   if (prenotazione.stato.toLowerCase() === 'attivo') {
  //     this.prenotazioniAlloggiService.deletePrenotazioneAlloggio(prenotazione.id).subscribe(
  //       () => {
  //         this.getPrenotazioniAlloggio();
  //       },
  //       error => {
  //         console.error('Errore nella cancellazione della prenotazione alloggio:', error);
  //       }
  //     );
  //   } else {
  //     this.prenotazioniAttivitaTurService.deletePrenotazioneAttivitaTuristica(prenotazione.id).subscribe(
  //       () => {
  //         this.getPrenotazioniAttivita();
  //       },
  //       error => {
  //         console.error('Errore nella cancellazione della prenotazione attività:', error);
  //       }
  //     );
  //   }
  // }
}