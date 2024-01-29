import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { PrenotazioniAlloggioService } from 'src/app/servizi/prenotazioni-alloggio.service';

@Component({
  selector: 'app-calendariopopup',
  templateUrl: './calendariopopup.component.html',
  styleUrls: ['./calendariopopup.component.css']
})
export class CalendariopopupComponent implements OnInit {

  form!: FormGroup;
  firstFormGroup: any;
  idCamera: any;
  prenotazioniAlloggioService: any;
  disponibilita!: string;
  isDisponibile: any;
  prenotazioni: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<CalendariopopupComponent>,
    private fb: FormBuilder,
    private prenotazioneAlloggioService: PrenotazioniAlloggioService
  ) {
    this.prenotazioni = data.prenotazioni;

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
      console.log(this.form.value);
      this.dialogRef.close();
    } else {
      console.error('Errore durante l\'invio del form');
      
    }
  }

  private formatDate(date: Date): string {
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
  
        // Se la disponibilità è positiva, aggiorna lo stato delle prenotazioni
        if (response.data) {
          this.aggiornaStatoPrenotazione("IN_CORSO");
        }
      }
    );
  }
  aggiornaStatoPrenotazione(arg0: string) {
    throw new Error('Method not implemented.');
  }
  
  
}