import { CamereService } from './../../../servizi/camere.service';
import { AttivitaService } from './../../../servizi/attivita.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopUpConfermaComponent } from '../pop-up-conferma/pop-up-conferma.component';

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
   private formBuilder: FormBuilder,
    private attivitaService: AttivitaService,
    private camereService: CamereService, private dialog: MatDialog) { 
    this.camere = this.formBuilder.group({
      capienza:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      prezzo:['',[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      categoria:['', Validators.required],
      descrizione:['',Validators.required],
      disponibilita:['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],

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

  openPopupConferma(message: string):void{
    const dialogRef = this.dialog.open(PopUpConfermaComponent, {
      width: '60%',
      data: { message },
      disableClose: true,

    });
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

    this.camereService.inserimentoCamere(
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
    if (this.camereInserite.length > 0) {
      this.openPopupConferma('Attivita inserita con successo');
    } else {
      
    }
  }
  }