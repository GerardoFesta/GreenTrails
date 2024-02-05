import { UtenteService } from './../../servizi/utente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpQuestionarioComponent } from './pop-up-questionario/pop-up-questionario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {
  questionario: FormGroup
  mostraRisultati = false;

  constructor(private formBuilder: FormBuilder, private utenteService: UtenteService, private router: Router, private dialog: MatDialog) {
    this.questionario = this.formBuilder.group({
      viaggioPreferito: ['', Validators.required],
      alloggioPreferito: ['', Validators.required],
      attivitaPreferita: ['', Validators.required],
      preferenzaAlimentare: ['', Validators.required],
      animaleDomestico: ['', Validators.required],
      budgetPreferito: ['', Validators.required],
      souvenir: ['', Validators.required],
      stagioniPreferite: ['', Validators.required],



    });
  }

  ngOnInit(): void {
  }

  openPopupQuestionario(message: string): void {
    const dialogRef = this.dialog.open(PopUpQuestionarioComponent,
      {
        width: '250px',
        data: { message },
        disableClose: true,
      })
  }

  esci() {
    this.router.navigate(['/areaRiservata']);
  }

  invio() {


    this.utenteService.invioQuestionario(
      this.questionario.get('viaggioPreferito')?.value,
      this.questionario.get('alloggioPreferito')?.value,
      this.questionario.get('attivitaPreferita')?.value,
      this.questionario.get('preferenzaAlimentare')?.value,
      this.questionario.get('animaleDomestico')?.value,
      this.questionario.get('budgetPreferito')?.value,
      this.questionario.get('souvenir')?.value,
      this.questionario.get('stagioniPreferite')?.value,
    ).subscribe(
      (response) => {
        this.openPopupQuestionario('Preferenze inviate')
      },
      (erorr) => {
        this.openPopupQuestionario('Preferenze non inviate')
      }
    )
  }

}
