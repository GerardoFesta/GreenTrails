import { AttivitaService } from 'src/app/servizi/attivita.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-politiche-ecosostenibili-attivita',
  templateUrl: './politiche-ecosostenibili-attivita.component.html',
  styleUrls: ['./politiche-ecosostenibili-attivita.component.css']
})
export class PoliticheEcosostenibiliAttivitaComponent implements OnInit {

  id: number = 0;
  valoriEcosostenibilita: string[] = [];

  constructor(private attivitaService: AttivitaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    })
    this.visualizzaDettagliAttivita();
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.id).subscribe((attivita) => {
      let valoriEcosostenibilitaTrue: string[] = Object.entries(attivita.data.valoriEcosostenibilita)
        .filter(([nomePolitica, valore]) => valore === true)
        .map(([nomePolitica, valore]) => this.convertCamelCaseToReadable(nomePolitica));

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

}
