import { RecensioneService } from 'src/app/servizi/recensione.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-recensione-form',
  templateUrl: './recensione-form.component.html',
  styleUrls: ['./recensione-form.component.css'],
  providers: [NgbRatingConfig],
})
export class RecensioneFormComponent implements OnInit {

  data = [
    { label: 'Domanda 1', showOptions: false, selectedOption: '' },
    { label: 'Domanda 2', showOptions: true, selectedOption: '' },
    { label: 'Domanda 3', showOptions: true, selectedOption: '' },
    { label: 'Domanda 4', showOptions: true, selectedOption: '' },
    { label: 'Domanda 5', showOptions: true, selectedOption: '' },
    { label: 'Domanda 6', showOptions: false, selectedOption: '' },
  ];

  data1: any[] = [];

  rating: number = 0;
  isSubmitDisabled: boolean = true;

  constructor(
    config: NgbRatingConfig,
    private recensioneService: RecensioneService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.updateData1();
  }

  inviaRecensione(recensioneForm: NgForm) {
    const idAttivita = +this.route.snapshot.params['id'];
    const valutazioneStelleEsperienza = this.rating;
    const descrizione = recensioneForm.value.valutazioneDiscorsiva;
    const idValori = 456;

    this.recensioneService.creaRecensione(
      idAttivita,
      valutazioneStelleEsperienza,
      descrizione,
      idValori
    ).subscribe(
      (response) => {
        console.log('Recensione inviata con successo!');
        console.log(response);
      },
      (error) => {
        console.error('Errore durante l\'invio della recensione', error);
      }
    );

    this.resetForm(recensioneForm);
  }

  updateSubmitButton() {
    const isRatingSelected = this.rating > 0;
    const isQuestionnaireFilled = this.data1.every(item => item.selectedOption === 'sì' || item.selectedOption === 'no');

    this.isSubmitDisabled = !isRatingSelected || !isQuestionnaireFilled;
  }

  selectOption(item: any, option: any) {
    item.selectedOption = option;
    this.updateSubmitButton();
  }

  updateData1() {
    this.data1 = this.data.filter(item => item.showOptions);
  }

  resetForm(form: NgForm) {
    form.reset();
    this.rating = 0;
    this.isSubmitDisabled = true;
    this.data1.forEach(item => item.selectedOption = '');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: 'snackbar-custom'
    });

    setTimeout(() => {
      this._snackBar.dismiss();
    }, 3000)
  }
}