import { Component, OnInit } from '@angular/core';
import { Attivita } from 'src/app/classi/attivita';
import { AttivitaService } from 'src/app/servizi/attivita.service';

@Component({
  selector: 'app-pagina-attivita',
  templateUrl: './pagina-attivita.component.html',
  styleUrls: ['./pagina-attivita.component.css']
})

export class PaginaAttivitaComponent implements OnInit {

  attivita?: Attivita;

  constructor(private attivitaService: AttivitaService) { }

  ngOnInit(): void {
    this.visualizzaDettagliAttivita(1);
  }

  visualizzaDettagliAttivita(id: number): void {
    this.attivitaService.visualizzaAttivita(id).subscribe(
      (attivita: Attivita) => {
        // Implementa la logica per visualizzare i dettagli dell'attività
        console.log('Dettagli dell\'attività:', attivita);
  
        // Esempio: Puoi assegnare l'attività a una variabile nel componente per utilizzarla nei template
        // this.dettagliAttivita = attivita;
      },
      (errore) => {
        console.error('Errore durante il recupero dei dettagli dell\'attività:', errore);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    );
  }
  

}
