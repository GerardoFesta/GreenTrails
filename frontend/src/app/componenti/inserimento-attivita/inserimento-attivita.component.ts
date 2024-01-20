import { AttivitaServiceService } from './../../servizi/attivita-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-inserimento-attivita',
  templateUrl: './inserimento-attivita.component.html',
  styleUrls: ['./inserimento-attivita.component.css']
})
export class InserimentoAttivitaComponent implements OnInit {
@Input() 
  myForm: FormGroup;
  formData: any = {};

  constructor(private fb: FormBuilder, private AttivitaServiceService: AttivitaServiceService ) {
    this.myForm = this.fb.group({
      sezione1Data: null,
      sezione2Data: null,
      sezione3Data: null,
      sezione4Data: null,
      sezione5Data: null,
    });
  }

  ngOnInit(): void {
  
  }

  
  onSezione1DataChanged(formData1: any) {
    this.myForm.patchValue({ sezione1Data: formData1 });
    console.log('Dati ricevuti dal componente figlio', formData1);
  }
  
  onSezione2DataChanged(formData2: any) {
    this.myForm.patchValue({ sezione2Data: formData2 });
  }

  onSezione3DataChanged(formData3: any) {
    this.myForm.patchValue({ sezione2Data: formData3});
  }

  onSezione4DataChanged(formData4: any) {
    this.myForm.patchValue({ sezione2Data: formData4 });
  }

  onSezione5DataChanged(formData5: any) {
    this.myForm.patchValue({ sezione2Data: formData5 });
  }

  onSubmit() {
    // Puoi accedere ai dati dei figli attraverso il FormGroup
    const formData1 = this.myForm.get('sezione1Data')?.value;
    const formData2 = this.myForm.get('sezione2Data')?.value;
    const formData3 = this.myForm.get('sezione3Data')?.value;
    const formData4 = this.myForm.get('sezione4Data')?.value;
    const formData5 = this.myForm.get('sezione5Data')?.value;


    this.formData = { ...formData1, ...formData2, ...formData3, ...formData4, ...formData5 };

    // Fai qualcosa con i dati (ad esempio, invia al server)
    console.log('Dati combinati', this.formData);


  this.AttivitaServiceService.inserimentoAttivita(this.formData)
    .subscribe((response) => {
      console.log('Dati inviati')
            });
  }
  }

