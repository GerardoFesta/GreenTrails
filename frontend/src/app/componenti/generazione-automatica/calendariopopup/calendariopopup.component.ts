import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendariopopup',
  templateUrl: './calendariopopup.component.html',
  styleUrls: ['./calendariopopup.component.css']
})
export class CalendariopopupComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendariopopupComponent>,
    private fb: FormBuilder,
  ) { }

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
}