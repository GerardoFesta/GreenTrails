import { ItinerariService } from './../../../../servizi/itinerari.service';
import { PrenotazioniAttivitaService } from './../../../../servizi/prenotazioni-attivita.service';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioniAlloggioService } from 'src/app/servizi/prenotazioni-alloggio.service';

@Component({
  selector: 'app-politiche-ecosostenibili-attivita',
  templateUrl: './politiche-ecosostenibili-attivita.component.html',
  styleUrls: ['./politiche-ecosostenibili-attivita.component.css']
})
export class PoliticheEcosostenibiliAttivitaComponent implements OnInit {
  @Input() attivita: any
  id: number = 0;
  isAlloggio: boolean = false;
  valoriEcosostenibilita: string[] = [];

  constructor(private attivitaService: AttivitaService,
     private route: ActivatedRoute, 
     private prenotazioniAlloggioService : PrenotazioniAlloggioService,
     private prenotazioniAttivitaService : PrenotazioniAttivitaService,
     private itinerariService: ItinerariService,
    public dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.itinerariService.changeId(this.id); 
      console.log(this.id)// Invia l'ID al servizio
    })
    this.visualizzaDettagliAttivita();
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.id).subscribe((attivita) => {
      let valoriEcosostenibilitaTrue: string[] = Object.entries(attivita.data.valoriEcosostenibilita)
        .filter(([nomePolitica, valore]) => valore === true)
        .map(([nomePolitica, valore]) => this.convertCamelCaseToReadable(nomePolitica));
        this.isAlloggio = attivita.data?.alloggio;

      this.valoriEcosostenibilita = attivita.data.valoriEcosostenibilita;
      
      this.valoriEcosostenibilita = valoriEcosostenibilitaTrue;
    }, (error) => {
      console.error(error);
    })
  }

  convertCamelCaseToReadable(camelCase: string): string {
    let result = camelCase.replace(/([A-Z])/g, ' $1');
    result = result.replace('C O2', 'CO2');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

openDialog() {
  console.log('Attivita: ', this.isAlloggio)
     if (this.isAlloggio === true) {
      this.prenotazioniAlloggioService.apriDialogAlloggio();
} else {
      this.prenotazioniAttivitaService.apriDialogAttivita();
    }
  }

}
