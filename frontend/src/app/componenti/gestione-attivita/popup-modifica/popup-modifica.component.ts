import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupModificaAlloggioComponent } from '../popup-modifica-alloggio/popup-modifica-alloggio.component';
import { AttivitaService } from 'src/app/servizi/attivita.service';
import { PopupConfermaModificaComponent } from '../popup-conferma-modifica/popup-conferma-modifica.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-popup-modifica',
  templateUrl: './popup-modifica.component.html',
  styleUrls: ['./popup-modifica.component.css']
})
export class PopupModificaComponent implements OnInit {

  inserimento: FormGroup;
  matcher = new MyErrorStateMatcher();
  prezzo: any;
  latitudine?: number;
  longitudine?: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupModificaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private attivitaService: AttivitaService
  ) {
    this.inserimento = this.formBuilder.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: [, Validators.required],
      disponibilita: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      indirizzo: ['', Validators.required],
      cap: ['', [Validators.required, Validators.maxLength(5), Validators.pattern(/^[0-9]+$/)]],
      citta: ['', Validators.required],
      provincia: ['', [Validators.required, Validators.maxLength(2)]],
      latitudine: ['', [Validators.required, Validators.pattern(/^[-]?([0-8]?[0-9]|90)\.[0-9]{1,15}$/)]],
      longitudine: ['', [Validators.required, Validators.pattern(/^[-]?([0-8]?[0-9]|90)\.[0-9]{1,15}$/)]],
      descrizioneBreve: ['', Validators.required],
      costo: [0, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      descrizioneLunga: ['', Validators.required],
    });

  }

  ngOnInit(): void {
  }

  categorieAll = [
    { value: 0, label: 'Hotel' },
    { value: 1, label: 'Bed & Breakfast' },
    { value: 2, label: 'Villaggio Turistico' },
    { value: 3, label: 'Ostello' },
  ];

  categorieAtt = [
    { value: 0, label: 'All\'aperto' },
    { value: 1, label: 'Visite Culturali-Storiche' },
    { value: 2, label: 'Relax' },
    { value: 3, label: 'Gastronomia' }
  ];

  isTipoFalse(): boolean {
    return this.inserimento.get('tipo')?.value === 'false';
  }

  toppings = new FormControl(false, [Validators.required]);
  errorMessage: string | null = null;

  openPopupAlloggio(idAttivita: number): void {
    const dialogRef = this.dialog.open(PopupModificaAlloggioComponent, {
      width: '60%',
      data: { idAttivita: idAttivita }
    });
  }

  openPopupConferma(message: string): void {
    const dialogRef = this.dialog.open(PopupConfermaModificaComponent, {
      width: '60%',
      data: { message },
      disableClose: true,
    });
  }

  onSubmit() {

    console.log("id:", this.data.id)
    console.log("nome:", this.data.nome)
    console.log("indirizzo:", this.data.indirizzo)
    console.log("cap:", this.data.cap)
    console.log("citta:", this.data.citta)
    console.log("provincia:", this.data.provincia)
    console.log("latitudine:", this.data.latitudine)
    console.log("longitudine:", this.data.longitudine)
    console.log("descrizioneBreve:", this.data.descrizioneBreve)
    console.log("descrizioneLunga:", this.data.descrizioneLunga)
    console.log("valori:", this.data.valori)
    console.log("prezzo:", this.data.prezzo)
    console.log("disponibilita:", this.data.disponibilita)
    console.log("categoriaAlloggio:", this.data.categoriaAlloggio)
    console.log("categoriaAttivitaTuristica:", this.data.categoriaAttivitaTuristica)

    const formData = new FormData();

    const nomeValue = this.inserimento.get('nome')?.value;
    console.log("NOME: ", nomeValue);
    formData.append('nome', nomeValue);

    const disponibilitaValue = this.inserimento.get('disponibilita')?.value;
    console.log("DISPONIBILITA: ", disponibilitaValue);
    formData.append('disponibilita', disponibilitaValue);

    const tipoValue = this.inserimento.get('tipo')?.value;
    if (tipoValue === 'true') {
      const categoriaAlloggioValue = this.inserimento.get('categoria')?.value;
      console.log("CATEGORIA ALLOGGIO: ", categoriaAlloggioValue);
      formData.append('categoriaAlloggio', categoriaAlloggioValue);
    } else {
      const categoriaAttivitaTuristicaValue = this.inserimento.get('categoria')?.value;
      console.log("CATEGORIA ATTIVITA TURISTICA: ", categoriaAttivitaTuristicaValue);
      formData.append('categoriaAttivitaTuristica', categoriaAttivitaTuristicaValue);
    }

    const indirizzoValue = this.inserimento.get('indirizzo')?.value;
    console.log("INDIRIZZO: ", indirizzoValue);
    formData.append('indirizzo', indirizzoValue);

    const capValue = this.inserimento.get('cap')?.value;
    console.log("CAP: ", capValue);
    formData.append('cap', capValue);

    const cittaValue = this.inserimento.get('citta')?.value;
    console.log("CITTA: ", cittaValue);
    formData.append('citta', cittaValue);

    const provinciaValue = this.inserimento.get('provincia')?.value;
    console.log("PROVINCIA: ", provinciaValue);
    formData.append('provincia', provinciaValue);

    const latitudineValue = this.inserimento.get('latitudine')?.value;
    console.log("LATITUDINE: ", latitudineValue);
    formData.append('latitudine', latitudineValue);

    const longitudineValue = this.inserimento.get('longitudine')?.value;
    console.log("LONGITUDINE: ", longitudineValue);
    formData.append('longitudine', longitudineValue);

    const descrizioneBreveValue = this.inserimento.get('descrizioneBreve')?.value;
    console.log("DESCRIZIONE BREVE: ", descrizioneBreveValue);
    formData.append('descrizioneBreve', descrizioneBreveValue);

    const prezzoValue = this.inserimento.get('costo')?.value;
    console.log("PREZZO: ", prezzoValue);
    formData.append('prezzo', prezzoValue);

    const descrizioneLungaValue = this.inserimento.get('descrizioneLunga')?.value;
    console.log("DESCRIZIONE LUNGA: ", descrizioneLungaValue);
    formData.append('descrizioneLunga', descrizioneLungaValue);

    const valori = this.data.valori;
    formData.append('valori', valori);

    console.log(formData);


    this.attivitaService.modificaAttivita(this.data.id, formData)
      .subscribe((risposta) => {
        console.log(risposta);

        if (this.inserimento.get('tipo')?.value === 'true' && risposta?.status === 'success') {
          const idAttivita = risposta.data.id;
          this.openPopupAlloggio(idAttivita)
        } else if (risposta?.status === 'success') {
          this.openPopupConferma('Attivita inserita con successo')
        }
        else {
          const errorMessage = risposta?.error?.message || 'Errore sconosciuto';
          this.openPopupConferma(errorMessage);
        }
      }, (error) => {
        console.error(error);
      })


  }
}
