import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from '../servizi/attivita.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-gestione-valori',
  templateUrl: './gestione-valori.component.html',
  styleUrls: ['./gestione-valori.component.css']
})
export class GestioneValoriComponent implements OnInit {

  id: number = 0;
  valoriEcosostenibilita: string[] = [];
  valoriEcosostenibilitaSelected: { [key: string]: string } = {};
  isGestoreAttivita: boolean = false;

  constructor(
    private attivitaService: AttivitaService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'] || 11;
    })
    this.visualizzaDettagliAttivita();
  }



  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivitaPerGestore().subscribe(
      (attivita) => {
        this.valoriEcosostenibilita = Object.keys(attivita.data.valoriEcosostenibilita);
  
        this.valoriEcosostenibilita.forEach(valore => {
          this.valoriEcosostenibilitaSelected[valore] = attivita.data.valoriEcosostenibilita[valore] ? 'true' : 'false';
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  convertCamelCaseToReadable(camelCase: string): string {
    let result = camelCase.replace(/([A-Z])/g, ' $1');
    result = result.replace('C O2', 'CO2');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  getRuoloFromCookie(): string {
    return this.cookieService.get('ruolo');
  }
}
