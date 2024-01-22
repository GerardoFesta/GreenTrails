import { PrenotazioniService } from './../../../../servizi/prenotazioni.service';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute, public dialog: MatDialog, private prenotazioniService: PrenotazioniService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.prenotazioniService.changeId(this.id); 
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

        // Puoi fare qualcosa con il valore di isAlloggio
        console.log('Valore di isAlloggio:', this.isAlloggio);

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
  console.log(this.isAlloggio)
      if (this.isAlloggio === true) {
      this.prenotazioniService.apriDialogAlloggio();
   } else {
      this.prenotazioniService.apriDialogAttivita();
    }
  }



}
