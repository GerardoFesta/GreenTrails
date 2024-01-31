import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { PrenotazioniAlloggioService } from 'src/app/servizi/prenotazioni-alloggio.service';
import { PrenotazioniAttivitaService } from 'src/app/servizi/prenotazioni-attivita.service';
import { PopUpConfermaComponent } from '../../inserimento-attivita/pop-up-conferma/pop-up-conferma.component';

@Component({
  selector: 'app-calendariopopup',
  templateUrl: './calendariopopup.component.html',
  styleUrls: ['./calendariopopup.component.css']
})
export class CalendariopopupComponent implements OnInit {

  form!: FormGroup;
  firstFormGroup: any;
  idCamera: any;
  disponibilita!: string;
  isDisponibile: any;

  dataInizio: any;
  dataFine: any;
  numAdulti: any;
  numBambini: any;
  numPersone: any;

  capienza: any;

  prenotazioniAlloggio: any = [];
  prenotazioniAttivitaTuristica: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<CalendariopopupComponent>,
    private fb: FormBuilder,
    private prenotazioniAlloggioService: PrenotazioniAlloggioService,
    private prenotazioniAttivitaService: PrenotazioniAttivitaService,
    public dialog: MatDialog
  ) {
    this.prenotazioniAlloggio = this.data.prenotazioniAlloggio;
    this.prenotazioniAttivitaTuristica = this.data.prenotazioniAttivitaTuristica;

    console.log("Prenotazioni alloggio: ", this.prenotazioniAlloggio);
    console.log("Prenotazioni attività turistica: ", this.prenotazioniAlloggio);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      dataInizio: ['', Validators.required],
      dataFine: ['', Validators.required],
      numAdulti: ['', Validators.required],
      numBambini: ['', Validators.required]
    });
  }


  submitForm() {
    if (this.form.valid) {
      console.log("FORM COMPLETO", this.form.value);

      this.dataInizio = this.form.value.dataInizio;
      this.dataFine = this.form.value.dataFine;
      this.numAdulti = this.form.value.numAdulti;
      this.numBambini = this.form.value.numBambini;

      this.numPersone = parseInt(this.numBambini) + parseInt(this.numAdulti);
      console.log("NUMERO DI PERSONE", this.numPersone)

      let dataInizio = new Date(this.dataInizio);
      const dataFine = new Date(this.dataFine);

      let dataInizioFormattata = this.formatDate(this.dataInizio);
      let dataFineFormattata = this.formatDate(this.dataFine);

      console.log("DATA INIZIO", dataInizioFormattata)
      console.log("DATA FINE", dataFineFormattata)
      console.log("NUM ADULTI", this.numAdulti)
      console.log("NUM BAMBINI", this.numBambini);

      this.prenotazioniAlloggio.forEach((item: any, index: number) => {
        console.log("PRENOTAZIONE ALLOGGIO N.", index, item);

        this.prenotazioniAlloggioService.confermaPrenotazioneAlloggio(
          item.id,
          this.numAdulti,
          this.numBambini,
          dataInizio.toISOString(),
          dataFine.toISOString(),
          1).subscribe((risposta) => {
            console.log("CONFERMA PRENOTAZIONE ALLOGGIO: ", risposta)
            this.capienza = risposta.data.camera.capienza;
            console.log("Capienza camera", this.capienza);
          }, (error) => {
            console.error(error)
          })
      });

      this.prenotazioniAttivitaTuristica.forEach((item: any, index: number) => {
        this.prenotazioniAttivitaService.confermaPrenotazioneAttivitaTuristica(
          item.id,
          this.numAdulti,
          this.numBambini,
          dataInizioFormattata,
          dataFineFormattata
        ).subscribe((risposta) => {
          console.log("CONFERMA PRENOTAZIONE ATTIVITà TURISTICA: ", risposta);
        })

        this.openPopupConferma('Itinerario confermato!')
      })
    } else {
      console.error('Errore durante l\'invio del form');

    }

  }

  openPopupConferma(message: string): void {
    const dialogRef = this.dialog.open(PopUpConfermaComponent, {
      width: '60%',
      data: { message },
      disableClose: true,
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  verificaDisponibilitaAlloggio() {
    const formData = {
      arrivo: this.formatDate(this.firstFormGroup.get('arrivo')?.value),
      partenza: this.formatDate(this.firstFormGroup.get('partenza')?.value),
      idCamera: this.idCamera,
    };

    // Verifica disponibilità per prenotazione alloggio
    this.prenotazioniAlloggioService.verificaDisponibilitaAlloggio(
      this.idCamera,
      formData.arrivo,
      formData.partenza
    ).subscribe(
      (response: { data: any; }) => {
        this.disponibilita = response.data ? 'Disponibile' : 'Non disponibile';
        this.isDisponibile = response.data;
      }
    );
  }

}