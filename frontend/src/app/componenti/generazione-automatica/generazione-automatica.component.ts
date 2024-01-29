  import { MatDialog } from '@angular/material/dialog';
  import { Router } from '@angular/router';
  import { Component } from '@angular/core';
  import { AttivitaService } from 'src/app/servizi/attivita.service';
  import { UploadService } from 'src/app/servizi/upload.service';
  import { CalendariopopupComponent } from './calendariopopup/calendariopopup.component';
  import { ItinerariService } from 'src/app/servizi/itinerari.service';
  import { CookieOptions, CookieService } from 'ngx-cookie-service';
  import { UtenteService } from 'src/app/servizi/utente.service';

  @Component({
    selector: 'app-generazione-automatica',
    templateUrl: './generazione-automatica.component.html',
    styleUrls: ['./generazione-automatica.component.css']
  })
  export class GenerazioneAutomaticaComponent {
//     }
//   );
// }

    attivitaList: any[] = [
      {nome: 'attivita 1', descrizione: 'descrizione attivita 1'},
      {nome: 'attivita 2', descrizione: 'descrizione attivita 2'},
      {nome: 'attivita 3', descrizione: 'descrizione attivita 3'},
      {nome: 'attivita 4', descrizione: 'descrizione attivita 4'},
    ];


    fileNames: string[] = [];
    imageUrls: string[][] = [];
    attivitaTuristicheList: any[] = [];
    alloggiList: any[] = [];
    preferenzeUtente:any;
    attivitaSelezionate: any [] = [];
    prenotazioni: any;
    preferenze:any;
    
    

    constructor(private itinerarioService: ItinerariService,
      private attivitaService: AttivitaService,
      private uploadService: UploadService,
      private route: Router,
      private dialog: MatDialog,
      private cookieService: CookieService,
      private utenteService: UtenteService
      ) {}


      ngOnInit(): void {
        this.getPreferenze()
          .then((preferenze) => {
            this.preferenzeUtente = preferenze;
            return Promise.all([
              this.loadDataForAlloggi(5),
              this.loadDataForAttivitaTuristiche(5)
            ]);
          })
          .then(() => {
            this.generaItinerario();
          })
          .catch((errore) => {
            console.error('Errore durante il recupero delle preferenze o il caricamento dei dati:', errore);
          });
      }
      
      generaItinerario(): void {
        this.getPreferenze()
          .then((preferenze) => {
            return this.itinerarioService.generaItinerario();
          })
          .then((itinerarioObservable) => {
            itinerarioObservable.subscribe(
              (itinerarioGenerato) => {
                console.log('Itinerario generato:', itinerarioGenerato);
                this.visualizzaItinerario(itinerarioGenerato);
              },
              (errore) => {
                console.error('Errore durante la generazione dell\'itinerario:', errore);
              }
            );
          })
          .catch((errore) => {
            console.error('Errore durante il recupero delle preferenze:', errore);
          });
      }

      getPreferenze(): Promise<any> {
        const userIdString = this.cookieService.get('userId');
        const userId = parseInt(userIdString, 10);
      
        return new Promise<any>((resolve, reject) => {
          if (!isNaN(userId)) {
            this.utenteService.getPreferenze().subscribe(
              (preferenze) => {
                console.log('Preferenze utente:', preferenze);
                resolve(preferenze);
              },
              (errore) => {
                console.error('Errore durante il recupero delle preferenze dell\'utente:', errore);
                reject(errore);
              }
            );
          } else {
            console.error('ID dell\'utente non trovato');
            reject('ID dell\'utente non trovato');
          }
        });
      }
      


      rigeneraItinerario() {
        this.generaItinerario()
      }
    clickedHome(){
      this.route.navigate(['/homepage']);
    }


    openCalendario(){
      this.dialog.open(CalendariopopupComponent);
    }

    // salvaItinerarioNelDB(itinerarioId: number) {
    //   this.itinerarioService.getItinerario(itinerarioId).subscribe(
    //     (itinerario) => {
    //       console.log('Itinerario salvato nel DB:', itinerario);

    //       this.prenotazioni = itinerario.data;

    //       this.visualizzaItinerario(itinerario);
    //     },
    //     (errore) => {
    //       console.error('Errore durante il salvataggio dell\'itinerario nel DB:', errore);
    //     }
    //   );
    // }

    visualizzaItinerario(itinerario: { data: any[]; }) {
      console.log('Visualizza itinerario all\'utente:', itinerario);
    
      if (itinerario && itinerario.data) {
        console.log('Prenotazioni:', itinerario.data);
    
        // Itera su tutte le prenotazioni nell'itinerario
        for (const prenotazione of itinerario.data) {
          if (prenotazione.camera) {
            // È una prenotazione di alloggio
            this.visualizzaListaAlloggi(prenotazione.camera.alloggio);
          } else if (prenotazione.attivitaTuristica) {
            // È una prenotazione di attività turistica
            this.visualizzaListaAttivitaTuristiche(prenotazione.attivitaTuristica);
          }
        }
      }
    }

    private visualizzaListaAlloggi(limite: number): Promise<void> {
      return new Promise<void>((resolve) => {
        this.attivitaService.getAlloggi(limite).subscribe((result) => {
          const newAlloggi = result.data;
          this.alloggiList.push(...newAlloggi);
          resolve();
        });
      });
    }

    private visualizzaListaAttivitaTuristiche(limite: number): Promise<void> {
      return new Promise<void>((resolve) => {
        this.attivitaService.getAttivitaTuristiche(limite).subscribe((result) => {
          const newAttivitaTuristiche = result.data;
          this.attivitaTuristicheList.push(...newAttivitaTuristiche);
          resolve();
        });
      });
    }
    
    loadDataForAlloggi(limite: number): void {
      this.visualizzaListaAlloggi(limite).then(() => {
        this.processMediaFiles().then(() => {
          console.log('Data loaded for Alloggi:', this.alloggiList);
        });
      });
    }

    loadDataForAttivitaTuristiche(limite: number): void {
      this.visualizzaListaAttivitaTuristiche(limite).then(() => {
        this.processMediaFiles().then(() => {
          console.log('Data loaded for AttivitaTuristiche:', this.attivitaTuristicheList);
        });
      });
    }

    private processMediaFiles(): Promise<void[]> {
      const allItems = [
        ...this.attivitaList,
        ...this.alloggiList,
        ...this.attivitaTuristicheList,
      ];

      const promises = allItems.map((item: any) => {
        return new Promise<void>((resolve) => {
          this.uploadService.elencaFileCaricati(item.media).subscribe((listaFiles) => {
            if (listaFiles.data.length > 0) {
              const fileNames = listaFiles.data;
              const imageUrlsForItem: string[] = [];  

              const filePromises = fileNames.map((fileName: string) => {
                return new Promise<void>((fileResolve) => {
                  this.uploadService.serviFile(item.media, fileName).subscribe((file) => {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                      imageUrlsForItem.push(reader.result as string);
                      fileResolve();
                    };
                    reader.readAsDataURL(file);
                  });
                });
              });

              Promise.all(filePromises).then(() => {
                this.imageUrls[item.id] = [...imageUrlsForItem];
                resolve();
              });
            } else {
              resolve();
            }
          });
        });
      });

      return Promise.all(promises);
    }

    aggiungiAttivitaSelezionata(attivita: any){
      if(!this.attivitaSelezionate.includes(attivita)){
        this.attivitaSelezionate.push(attivita);
      }
    }

    rimuoviAttivitaSelezionata(attivita: any){
      const index = this.attivitaSelezionate.indexOf(attivita);
      if (index !== -1) {
        this.attivitaSelezionate.splice(index, 1);
      }
    }
  }

