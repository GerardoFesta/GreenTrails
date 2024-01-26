import { UtenteService } from './../../servizi/utente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {
  questionario : FormGroup
  mostraRisultati = false;

  constructor(private formBuilder: FormBuilder, private utenteService: UtenteService) { 
  this.questionario = this.formBuilder.group({
    viaggioPreferito: [],
    alloggioPreferito: [],
    attivitaPreferita:[],
    preferenzaAlimentare:[],
    animaleDomestico:[],
    budgetPreferito:[],
    souvenir:[],
    stagioniPreferite:[],

  
  
  });
}

  ngOnInit(): void {
  }

  mostraScelte() {
    // Recupera i valori e mostra i risultati
    console.log(this.questionario.value);
    this.mostraRisultati = true;
  }
  
invio(){
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
    (response) =>{
      console.log(response)
  }
)}

}
