import { AttivitaServiceService } from './../../../servizi/attivita-service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-alloggio',
  templateUrl: './pop-up-alloggio.component.html',
  styleUrls: ['./pop-up-alloggio.component.css']
})
export class PopUpAlloggioComponent implements OnInit {
  camere : FormGroup 
id: any
camereInserite: any[] = []

  constructor(public dialogRef: MatDialogRef<PopUpAlloggioComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
   private formBuilder: FormBuilder, private attivitaServiceService: AttivitaServiceService) { 
    this.camere = this.formBuilder.group({
      capienza:['',Validators.required],
      prezzo:['',Validators.required],
      categoria:['', Validators.required],
      descrizione:['',Validators.required],
      disponibilita:['',Validators.required],

  });
}

  ngOnInit(): void {
    console.log('Attivita creata:', this.data.idAttivita);
    console.log(this.data.idAttivita)
    this.id = this.data.idAttivita  }
  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }



  aggiungiCamera(){
    console.log(this.id)
    const camera = {
      categoria: this.camere.get('categoria')?.value,
      disponibilita: this.camere.get('disponibilita')?.value,
      descrizione: this.camere.get('descrizione')?.value,
      capienza: this.camere.get('capienza')?.value,
    };

    // Aggiungi la camera all'array
    this.camereInserite.push(camera);

    this.attivitaServiceService.inserimentoCamere(
      this.id,
      this.camere.get('categoria')?.value,
      this.camere.get('disponibilita')?.value,
      this.camere.get('descrizione')?.value,
      this.camere.get('capienza')?.value,

    ).subscribe((response) => {


    })
    this.camere.reset();
  }

  inviaCamere(){
    console.log('Inviati')
  }
}
