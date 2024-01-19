import { Component } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { ItinerarioService } from 'src/app/servizi/itinerario.service';
import { UploadService } from 'src/app/servizi/upload.service';

@Component({
  selector: 'app-generazione-automatica',
  templateUrl: './generazione-automatica.component.html',
  styleUrls: ['./generazione-automatica.component.css']
})
export class GenerazioneAutomaticaComponent {

  attivitaList: any[] = [];
  fileNames: string[] = [];
  imageUrls: string[][] = [];
  attivitaTuristicheList: any[] = [];
  alloggiList: any[] = [];
  preferenzeUtente:any;


  attivitaSelezionate: any [] = [];
  prenotazioni: any;

  constructor(private itinerarioService: ItinerarioService,
    private attivitaService: AttivitaService,
    private uploadService: UploadService) {}


    ngOnInit(): void {
      Promise.all([
        this.loadDataForAlloggi(5),
        this.loadDataForAttivitaTuristiche(5)
      ]);
    }

  generaItinerario() {
    const preferenzeUtente = {
      tipoCibo: 'Italiano',
      attivita: 'Escursione',
      durata: 'Pomeriggio'
    };

    this.itinerarioService.generaItinerario().subscribe(
      (itinerarioGenerato) => {
        console.log('Itinerario generato:', itinerarioGenerato);

        this.salvaItinerarioNelDB(itinerarioGenerato.id);
      },
      (errore) => {
        console.error('Errore durante la generazione dell\'itinerario:', errore);
      }
    );
  }


  salvaItinerarioNelDB(itinerarioId: number) {
    this.itinerarioService.getItinerario(itinerarioId).subscribe(
      (itinerario) => {
        console.log('Itinerario salvato nel DB:', itinerario);

        this.prenotazioni = itinerario.data;

        this.visualizzaItinerario(itinerario);
      },
      (errore) => {
        console.error('Errore durante il salvataggio dell\'itinerario nel DB:', errore);
      }
    );
  }

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
}
  

