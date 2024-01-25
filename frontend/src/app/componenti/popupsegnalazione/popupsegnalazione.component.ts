import { ActivatedRoute } from '@angular/router';
import { ValoriEcosostenibilitaService } from 'src/app/servizi/valori-ecosostenibilita.service';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { SegnalazioneService } from './../../servizi/segnalazione.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popupsegnalazione',
  templateUrl: './popupsegnalazione.component.html',
  styleUrls: ['./popupsegnalazione.component.css'],
  providers: [NgbRatingConfig],
})
export class PopupsegnalazioneComponent implements OnInit {

  @Output() formSottomesso = new EventEmitter<void>();
  @Output() chiudiPopup = new EventEmitter<void>();

  idAttivita: number;
  idValori: number = 0;

  descrizione: string = '';
  valoriEcosostenibilita: any;

  valori = [
    { label: '', selezionato: '' }
  ];

  isDescrizioneInserita: boolean = true;
  isValoriInseriti: boolean = true;
  isSubmitDisponibile: boolean = true;

  files!: FileList;

  constructor(
    private attivitaService: AttivitaService,
    private route: ActivatedRoute,
    private segnelazioneService :SegnalazioneService, 
    private valoriService: ValoriEcosostenibilitaService,
    public dialogRef: MatDialogRef<PopupsegnalazioneComponent>) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const idAttivita = +params['id'];
        this.visualizzaPolitiche(idAttivita);
      });
    }

    valoriEcosostenibilitaSelected: { politicheAntispreco: string, prodottiLocali: string, energiaVerde: string, raccoltaDifferenziata: string, limiteEmissioneCO2: string, contattoConNatura: string } = {
      politicheAntispreco: '',
      prodottiLocali: '',
      energiaVerde: '',
      raccoltaDifferenziata: '',
      limiteEmissioneCO2: '',
      contattoConNatura: ''
    };
  convertCamelCaseToReadable(camelCase: string): string {
    let result = camelCase.replace(/([A-Z])/g, ' $1');
    result = result.replace('C O2', 'CO2');
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  visualizzaPolitiche(idAttivita: number): void {
    this.attivitaService.visualizzaAttivita(idAttivita).subscribe(
      (attivita) => {
        const idValori = attivita.data.valoriEcosostenibilita.id;
        console.log('valori dichiarati dall\'attivita: ', attivita.data.valoriEcosostenibilita);

        this.valoriService.visualizzaValoriById(idValori).subscribe(
          (risposta) => {
            console.log('valori dichiarati dallattivita', risposta);
          }
        );

        let valoriEcosostenibilitaTrue: string[] = Object.entries(attivita.data.valoriEcosostenibilita)
          .filter(([nomePolitica, valore]) => valore === true)
          .map(([nomePolitica, valore]) => this.convertCamelCaseToReadable(nomePolitica));

        this.valori = valoriEcosostenibilitaTrue.map((label) => ({
          label: label,
          selezionato: '',
        }));
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateSubmit(){
    const isValoriInseriti = this.valori.every(item => item.selezionato === 'sì' || item.selezionato === 'no');
    this.isSubmitDisponibile = !isValoriInseriti || !this.isDescrizioneInserita;
  }

  selezionatoRadio(propertyName: string, option: string) {
    this.valoriEcosostenibilitaSelected[propertyName] = option;
    this.updateSubmit();
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

  submitForm(): void{
    this.valoriService.creaValoriEcosostenibilitaVisitatore(
      this.valoriEcosostenibilita.politicheAntispreco,
      this.valoriEcosostenibilita.prodottiLocali,
      this.valoriEcosostenibilita.energiaVerde,
      this.valoriEcosostenibilita.raccoltaDifferenziata,
      this.valoriEcosostenibilita.limiteEmissioneCO2,
      this.valoriEcosostenibilita.contattoConNatura,
    ).subscribe((valoriSegnalazione) => {
      this.idValori = valoriSegnalazione.data.id;
    })

    this.segnelazioneService.mandaDatiSegnalazione(this.idAttivita, this.descrizione, this.idValori)
    .subscribe((risposta: any) => {
        console.log(risposta);
        if(risposta?.status === 'success'){
        this.chiudiPopup.emit();
        this.formSottomesso.emit();
        this.dialogRef.close();
        }
      }, (error) => {
        console.log('Dettagli richiesta API:', error);
      });
  }

  closePopup(){
    this.chiudiPopup.emit();
    this.dialogRef.close();
  }
}
