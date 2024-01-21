import { RecensioneService } from 'src/app/servizi/recensione.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupRecensioneComponent } from '../popup-recensione/popup-recensione.component';
import { ValoriEcosostenibilitaService } from 'src/app/servizi/valori-ecosostenibilita.service';

@Component({
  selector: 'app-recensione-form',
  templateUrl: './recensione-form.component.html',
  styleUrls: ['./recensione-form.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioneFormComponent implements OnInit {

  idAttivita: number = 0;
  rating: number = 0;
  valoriEcosostenibilita: any;
  valutazioneDiscorsiva: string = '';

  idValori: number = 0;

  isTextAreaValid: boolean = true;
  isSubmitDisabled: boolean = true;

  valoriEcosostenibilitaRecensione: any;

  valori = [
    { label: '', selectedOption: '' }
  ];

  constructor(
    config: NgbRatingConfig,
    private recensioneService: RecensioneService,
    private route: ActivatedRoute,
    private attivitaService: AttivitaService,
    private dialog: MatDialog,
    private valoriService: ValoriEcosostenibilitaService
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idAttivita = +params['id'];
    })
    this.visualizzaDettagliAttivita();
  }

  convertCamelCaseToReadable(camelCase: string): string {
    let result = camelCase.replace(/([A-Z])/g, ' $1');
    result = result.replace('C O2', 'CO2');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  visualizzaDettagliAttivita(): void {
    this.attivitaService.visualizzaAttivita(this.idAttivita).subscribe((attivita) => {
      this.valoriEcosostenibilita = attivita.data.valoriEcosostenibilita;
      console.log("Valori eco originali: ", this.valoriEcosostenibilita);
      this.idValori = attivita.data.valoriEcosostenibilita.id;
      let valoriEcosostenibilitaTrue: string[] = Object.entries(attivita.data.valoriEcosostenibilita)
        .filter(([nomePolitica, valore]) => valore === true)
        .map(([nomePolitica, valore]) => this.convertCamelCaseToReadable(nomePolitica));

      this.valori = valoriEcosostenibilitaTrue.map((label) => ({
        label: label,
        selectedOption: ''
      }));
    }, (error) => {
      console.error(error);
    })
  }

  updateSubmitButton() {
    const isRatingSelected = this.rating > 0;
    const isQuestionnaireFilled = this.valori.every(item => item.selectedOption === 'sì' || item.selectedOption === 'no');

    this.isSubmitDisabled = !isRatingSelected || !isQuestionnaireFilled || !this.isTextAreaValid;
  }

  selectOption(item: any, option: any) {
    item.selectedOption = option;

    if (option === 'no') {
      const key = this.convertLabelToCamelCase(item.label);
      this.valoriEcosostenibilita[key] = false;
    }

    this.updateSubmitButton();
  }

  convertLabelToCamelCase(label: string): string {
    const words = label.split(' ');
    const camelCaseWords = words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        if (word === 'CO2') {
          return word;
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      }
    });
    return camelCaseWords.join('');
  }

  validateTextArea() {
    const regex = /^[A-Za-z0-9][\s\S]*$/;
    this.isTextAreaValid = regex.test(this.valutazioneDiscorsiva) || this.valutazioneDiscorsiva === '';
    this.updateSubmitButton();
  }

  resetForm(form: NgForm) {
    form.reset();
    this.rating = 0;
    this.isSubmitDisabled = true;
    this.valori.forEach(item => item.selectedOption = '');
    this.valutazioneDiscorsiva = '';
  }

  openPopup(message: string): void {
    const dialogRef = this.dialog.open(PopupRecensioneComponent, {
      width: '250px',
      data: { message },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Il popup è stato chiuso');
    });
  }

  inviaRecensione(recensioneForm: NgForm) {
    console.log(this.valoriEcosostenibilita.politicheAntispreco);
    this.valoriService.creaValoriEcosostenibilitaVisitatore(
      this.valoriEcosostenibilita.politicheAntispreco,
      this.valoriEcosostenibilita.prodottiLocali,
      this.valoriEcosostenibilita.energiaVerde,
      this.valoriEcosostenibilita.raccoltaDifferenziata,
      this.valoriEcosostenibilita.limiteEmissioneCO2,
      this.valoriEcosostenibilita.contattoConNatura,
    ).subscribe((valoreNew) => {
      console.log(valoreNew.data.id);

      this.idValori = valoreNew.data.id;

      this.recensioneService.creaRecensione(this.idAttivita, this.rating, this.valutazioneDiscorsiva, this.idValori)
        .subscribe((risposta: any) => {
          console.log(risposta);
          if (risposta?.status === 'success') {
            this.openPopup('Recensione inviata con successo!');
          } else {
            this.openPopup('Errore nell\'\invio della recensione!');
          }
        }, (error) => {
          console.error(error);
        });
    })
  }
}
