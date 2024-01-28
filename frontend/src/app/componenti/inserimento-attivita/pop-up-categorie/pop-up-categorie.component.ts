import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/servizi/categoria.service';
import { PopUpConfermaComponent } from '../pop-up-conferma/pop-up-conferma.component';

@Component({
  selector: 'app-pop-up-categorie',
  templateUrl: './pop-up-categorie.component.html',
  styleUrls: ['./pop-up-categorie.component.css']
})
export class PopUpCategorieComponent implements OnInit {

  idAttivita : any
  categorieSelezionate: string[] = [];
  formGroup: FormGroup

  constructor(public dialogRef: MatDialogRef<PopUpConfermaComponent>,
    private categoriaService: CategoriaService,      private dialog: MatDialog,
   @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,) { 
     this.formGroup=  this.formBuilder.group({
       categoria: ['',Validators.required],
     })
    }

  ngOnInit(): void {
    console.log('Attivita creata:', this.data.idAttivita);
    console.log(this.data.idAttivita)
    this.idAttivita = this.data.idAttivita  
  }


  aggiungiCategoria(){


    console.log(this.idAttivita)

    const categoriaSelezionata = this.formGroup.get('categoria')?.value;
    console.log('categoria', categoriaSelezionata)
    this.categoriaService.aggiungiCategoria(this.idAttivita, categoriaSelezionata )
    .subscribe((response) => {


    })
  }


  openPopupConferma(message: string):void{
    const dialogRef = this.dialog.open(PopUpConfermaComponent, {
      width: '60%',
      data: { message },
      disableClose: true,

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
    this.openPopupConferma('Attivita inserita con successo')
  }

}
