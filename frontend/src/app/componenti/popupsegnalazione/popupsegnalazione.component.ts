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

  descrizione: string = '';
  valoriEcosostenibilita: any [] = [];
  
  constructor(private segnelazioneService :SegnalazioneService, 
    public dialogRef: MatDialogRef<PopupsegnalazioneComponent>) { }

  ngOnInit(): void {
    /*const attivitaId = 123; 
    this.segnelazioneService.getValoriEcosostenibilitaPerAttivita(attivitaId).subscribe({
      next: (valori: any) => {
        this.valoriEcosostenibilita = valori;
      },
      error: (error: any) => {
        console.error('Errore durante il recupero dei valori di ecosostenibilità', error);
      }
    });
  */
  }


  submitForm(): void{
    const formData = {
      descrizione: this.descrizione,
      valoriEcosostenibilita: this.valoriEcosostenibilita,
    };

    this.segnelazioneService.mandaDatiSegnalazione(formData).subscribe({
      next: () => {
        this.chiudiPopup.emit();
        this.formSottomesso.emit();
        this.dialogRef.close();
      }, 
      error: (error: any) => {
        console.error('Errore durante l\'invio del form', error);
        console.log('Dettagli richiesta API:', error);

      }
    });
  }

  closePopup(){
    this.chiudiPopup.emit();
    this.dialogRef.close();
  }
}
