import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from '../servizi/attivita.service';
import { CookieService } from 'ngx-cookie-service';
import { ValoriEcosostenibilitaService } from '../servizi/valori-ecosostenibilita.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-gestione-valori',
  templateUrl: './gestione-valori.component.html',
  styleUrls: ['./gestione-valori.component.css']
})
export class GestioneValoriComponent implements OnInit {


  id: number = 0;
  selectedValoreId: number = 0; 
  valoriEcosostenibilita: string[] = [];
  valoriEcosostenibilitaSelected: { [key: string]: string } = {};
  isGestoreAttivita: boolean = false;
nome: any;

  constructor(
    private attivitaService: AttivitaService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private valorieco: ValoriEcosostenibilitaService
  ) {}

  valori = [
    { label: '', selezionato: '' }
  ];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'] || 11;
    });

    // Verifica il ruolo dell'utente
    const ruolo = this.getRuoloFromCookie();
    this.isGestoreAttivita = ruolo === 'GESTORE_ATTIVITA';

    if (this.isGestoreAttivita) {
      this.visualizzaDettagliAttivita();
    }
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.id).subscribe(
      (attivita) => {    
        this.selectedValoreId = attivita.data.valoriEcosostenibilita.id;
        console.log('valori dichiarati dall\'attivita: ', attivita.data.valoriEcosostenibilita);

        this.valoriEcosostenibilita = Object.keys(attivita.data.valoriEcosostenibilita)
          .filter(key => key !== 'id');
  
        this.valoriEcosostenibilita.forEach(valore => {
          const valoreId = attivita.data.valoriEcosostenibilita[valore].id;
          this.valoriEcosostenibilitaSelected[valore] = attivita.data.valoriEcosostenibilita[valore] ? 'true' : 'false';
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
// Gestione del cambiamento dell'opzione selezionata
selezionatoRadio(valore: string, option: string) {
  this.valoriEcosostenibilitaSelected[valore] = option;
  this.updateSubmit();
}

// Inizializzazione dell'array valoriEcosostenibilitaSelected
inizializzaValoriEcosostenibilitaSelected() {
  this.valoriEcosostenibilita.forEach(valore => {
      this.valoriEcosostenibilitaSelected[valore] = '';  // Inizializza tutti a vuoti
  });
}

// Aggiornamento della sottomissione
updateSubmit() {
  const isValoriInseriti = this.valori.every(item => item.selezionato === 'sì' || item.selezionato === 'no');
}


  convertLabelToCamelCase(label: string): string {
    const words = label.split(' ');
    const camelCaseWords = words.map((word, index) =>{
      if(index === 0){
        return word.toLowerCase();
      } else {
        if (word === 'CO2'){
          return word;
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
        }
      }
    });
    return camelCaseWords.join('');
  }

  convertCamelCaseToReadable(camelCase: string): string {
    let result = camelCase.replace(/([A-Z])/g, ' $1');
    result = result.replace('C O2', 'CO2');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  getRuoloFromCookie(): string {
    return this.cookieService.get('ruolo');
  }
  
  submitForm(): void {
    if (!this.selectedValoreId) {
      console.error('ID dei valori di ecosostenibilità non valido.');
      return;
    }
  
    const politicheAntispreco = this.valoriEcosostenibilitaSelected['politicheAntispreco'] === 'true';
    const prodottiLocali = this.valoriEcosostenibilitaSelected['prodottiLocali'] === 'true';
    const energiaVerde = this.valoriEcosostenibilitaSelected['energiaVerde'] === 'true';
    const raccoltaDifferenziata = this.valoriEcosostenibilitaSelected['raccoltaDifferenziata'] === 'true';
    const limiteEmissioneCO2 = this.valoriEcosostenibilitaSelected['limiteEmissioneCO2'] === 'true';
    const contattoConNatura = this.valoriEcosostenibilitaSelected['contattoConNatura'] === 'true';
  
    // Assicurati di chiamare il servizio di modifica qui
    this.valorieco.modificaValoriEcosostenibilita(
      this.selectedValoreId,
      politicheAntispreco,
      prodottiLocali,
      energiaVerde,
      raccoltaDifferenziata,
      limiteEmissioneCO2,
      contattoConNatura
    ).subscribe(
      (response) => {
        // Gestisci la risposta in base alle tue esigenze
        console.log('Modifica effettuata con successo', response);
      },
      (error) => {
        console.error('Errore durante la modifica', error);
      }
    );
  }

}
