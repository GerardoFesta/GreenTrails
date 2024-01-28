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
