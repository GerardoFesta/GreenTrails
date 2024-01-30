import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { UploadService } from 'src/app/servizi/upload.service';
import { CalendariopopupComponent } from './calendariopopup/calendariopopup.component';
import { ItinerariService } from 'src/app/servizi/itinerari.service';
import { CookieService } from 'ngx-cookie-service';
import { UtenteService } from 'src/app/servizi/utente.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { PrenotazioniAlloggioService } from 'src/app/servizi/prenotazioni-alloggio.service';
import { PrenotazioniAttivitaService } from 'src/app/servizi/prenotazioni-attivita.service';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
  selector: 'app-generazione-automatica',
  templateUrl: './generazione-automatica.component.html',
  styleUrls: ['./generazione-automatica.component.css']
})
export class GenerazioneAutomaticaComponent {
  
  alloggioDataList: any[] = [];
  attivitaTuristicaDataList: any[] = [];
  imageUrls: string[] = [];
  attivitaList: any[] = [];
  attivitaDataList: any[] = [];
  preferenzeUtente: any;
  attivitaSelezionate: any[] = [];
  currentImageIndex: number = 0;
  alloggioImageUrls: string[] = [];
  attivitaTuristicaImageUrls: string[] = [];
  constructor(private itinerarioService: ItinerariService,
    private uploadService: UploadService,
    private route: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private utenteService: UtenteService,
    private sanitizer: DomSanitizer,
    private prenotazioneService: PrenotazioniAlloggioService,
    private prenotazioneService1: PrenotazioniAttivitaService) {}

  ngOnInit(): void {
    this.getPreferenze()
      .then((preferenze) => {
        this.preferenzeUtente = preferenze;
      })
      .then(() => {
        this.generaItinerario();
      })
      .catch((errore) => {
        console.error('Errore durante il recupero delle preferenze o il caricamento dei dati:', errore);
      });
  }
/*Prendo le preferenze e genero l'itinerario */
  generaItinerario(): void {
    this.getPreferenze()
      .then((preferenze) => {
        return this.itinerarioService.generaItinerario();
      })
      .then((itinerarioObservable) => {
        itinerarioObservable.subscribe(
          (itinerarioGenerato) => {
            const idItinerarioGenerato = itinerarioGenerato.data.id;
            console.log('Itinerario generato:', itinerarioGenerato);
            console.log('dati', idItinerarioGenerato);

            this.salvaIdItinerarioNelloStorageLocale(idItinerarioGenerato);
            this.visualizzaItinerario(idItinerarioGenerato);
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

  salvaIdItinerarioNelloStorageLocale(idItinerario: number): void {
    localStorage.setItem('idItinerarioGenerato', idItinerario.toString());
  }
 itinerarioCompleto: any[] = [];

/*Visualizza dati itinerario*/

visualizzaItinerario(id: number): void {
  this.itinerarioService.visualizzaItinerario(id).subscribe(
    (dettagliItinerario) => {
      const prenotazioniAlloggio = dettagliItinerario.data.prenotazioniAlloggio;
      const prenotazioniAttivita = dettagliItinerario.data.prenotazioniAttivitaTuristica;

      if (prenotazioniAlloggio && prenotazioniAlloggio.length > 0) {
        this.loadDataAlloggio(prenotazioniAlloggio[0].camera.alloggio);
      }

      if (prenotazioniAttivita && prenotazioniAttivita.length > 0) {
        for (let i = 0; i < prenotazioniAttivita.length; i++) {
          const datiAttivita = prenotazioniAttivita[i].attivitaTuristica;
          this.loadDataAttivitaTuristica(datiAttivita);
        }
      } else {
        console.log('Nessuna prenotazione di attività turistiche disponibile.');
      }

      this.itinerarioCompleto = this.alloggioDataList.concat(this.attivitaTuristicaDataList);
    }
  );
}
getSafeImageUrl(base64Image: string): SafeResourceUrl {
  const imageUrl = `data:image/jpeg;base64,${base64Image}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
}
  
  /*mi aiuta alla visualizzazione dei dati dell'alloggio*/

loadDataAlloggio(alloggioData: any): void {
  console.log('Alloggio - Nome:', alloggioData.nome);
  console.log('Alloggio - DescrizioneBreve:', alloggioData.descrizioneBreve);

  const alloggioElement = {
    tipo: 'alloggio',
    data: {
      nome: alloggioData.nome,
      descrizioneBreve: alloggioData.descrizioneBreve,
      imageUrl: '' // Aggiungi questa proprietà per contenere l'URL dell'immagine
    }
  };

  this.alloggioDataList.push(alloggioElement);

  if (alloggioData.media && alloggioData.media.length > 0) {
    this.processMedia(alloggioData.media);
  }
}

/*mi aiuta alla visualizzazione dei dati delle attivita */
loadDataAttivitaTuristica(attivitaTuristicaData: any): void {
  console.log('AttivitaTuristica - Nome:', attivitaTuristicaData.nome);
  console.log('AttivitaTuristica - DescrizioneBreve:', attivitaTuristicaData.descrizioneBreve);
  console.log('immagine', attivitaTuristicaData.media);

  const attivitaTuristicaElement = {
    tipo: 'attivitaTuristica',
    data: {
      nome: attivitaTuristicaData.nome,
      descrizioneBreve: attivitaTuristicaData.descrizioneBreve,
      imageUrl: '' // Aggiungi questa proprietà per contenere l'URL dell'immagine
    }
  };

  this.attivitaTuristicaDataList.push(attivitaTuristicaElement);

  if (attivitaTuristicaData.media && attivitaTuristicaData.media.length > 0) {
    this.processMedia(attivitaTuristicaData.media);
  }
}
processMedia(mediaItem: any): void {
  if (mediaItem) {
    this.uploadService.elencaFileCaricati(mediaItem).subscribe((listaFiles) => {
      if (listaFiles.data.length > 0) {
        const fileName = listaFiles.data[0];
        this.uploadService.serviFile(mediaItem, fileName).subscribe((file) => {
          let reader = new FileReader();
          reader.onloadend = () => {
            this.imageUrls.push(reader.result as string);
            this.currentImageIndex = this.imageUrls.length + 1;
          };
          reader.readAsDataURL(file);
        });
      }
    });
  } else {
    console.error('mediaItem non è definito:', mediaItem);
  }
}

 /*metodo che mi prende le preferenze dell'utente*/

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
    location.reload(); // o window.location.reload();
  }
  

  clickedHome() {
    this.route.navigate(['/homepage']);
  }

  openCalendario() {
    this.dialog.open(CalendariopopupComponent);
  }

  aggiungiAttivitaSelezionata(attivita: any) {
    if (!this.attivitaSelezionate.includes(attivita)) {
      this.attivitaSelezionate.push(attivita);
    }
  }

  rimuoviAttivitaSelezionata(attivita: any) {
    const index = this.attivitaSelezionate.indexOf(attivita);
    if (index !== -1) {
      this.attivitaSelezionate.splice(index, 1);
    }
  }
}
