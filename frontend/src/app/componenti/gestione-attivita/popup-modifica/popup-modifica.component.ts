import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupModificaAlloggioComponent } from '../popup-modifica-alloggio/popup-modifica-alloggio.component';
import { Subject, takeUntil } from 'rxjs';
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
export class PopupModificaComponent implements OnInit, OnDestroy {

  inserimento: FormGroup;
  matcher = new MyErrorStateMatcher();
  prezzo: any;
  private destroy$ = new Subject<void>();
  isNomeCompiled: boolean = false;
  isTipoSelected: boolean = false;
  isCategoriaSelected: boolean = false;
  isDisponibilitaCompiled: boolean = false;
  isIndirizzoCompiled: boolean = false;
  isCapCompiled: boolean = false;
  isCittaCompiled: boolean = false;
  isProvinciaCompiled: boolean = false;
  isLatitudineCompiled: boolean = false;
  isLongitudineCompiled: boolean = false;
  isDescrizioneBreveCompiled: boolean = false;
  isDescrizioneLungaCompiled: boolean = false;
  isCostoCompiled: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PopupModificaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    this.inserimento = this.formBuilder.group({
      nome: [this.data.nome],
      tipo: [''],
      categoria: [true],
      disponibilita: [this.data.disponibilita],
      indirizzo: [this.data.indirizzo],
      cap: [this.data.cap],
      citta: [this.data.citta],
      provincia: [this.data.provincia],
      latitudine: [this.data.x],
      longitudine: [this.data.y],
      descrizioneBreve: [this.data.descrizioneBreve],
      costo: [this.data.prezzo],
      descrizioneLunga: [this.data.descrizioneLunga],
    });

    this.inserimento.get('nome')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isNomeCompiled = !!value;
      console.log('nome:', value);
      console.log('nome is valid:', this.inserimento.get('nome')?.valid);
      console.log('isNomeCompiled:', this.isNomeCompiled);
    });
    
    this.inserimento.get('tipo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isTipoSelected = !!value;
      console.log('tipo:', value);
      console.log('tipo is valid:', this.inserimento.get('tipo')?.valid);
      console.log('isTipoSelected:', this.isTipoSelected);
    });
    
    this.inserimento.get('categoria')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isCategoriaSelected = !!value;
      console.log('categoria:', value);
      console.log('categoria is valid:', this.inserimento.get('categoria')?.valid);
      console.log('isCategoriaSelected:', this.isCategoriaSelected);
    });
    
    this.inserimento.get('disponibilita')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isDisponibilitaCompiled = !!value;
      console.log('disponibilita:', value);
      console.log('disponibilita is valid:', this.inserimento.get('disponibilita')?.valid);
      console.log('isDisponibilitaCompiled:', this.isDisponibilitaCompiled);
    });
    
    this.inserimento.get('indirizzo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isIndirizzoCompiled = !!value;
      console.log('indirizzo:', value);
      console.log('indirizzo is valid:', this.inserimento.get('indirizzo')?.valid);
      console.log('isIndirizzoCompiled:', this.isIndirizzoCompiled);
    });
    
    this.inserimento.get('cap')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isCapCompiled = !!value;
      console.log('cap:', value);
      console.log('cap is valid:', this.inserimento.get('cap')?.valid);
      console.log('isCapCompiled:', this.isCapCompiled);
    });
    
    this.inserimento.get('citta')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isCittaCompiled = !!value;
      console.log('citta:', value);
      console.log('citta is valid:', this.inserimento.get('citta')?.valid);
      console.log('isCittaCompiled:', this.isCittaCompiled);
    });
    
    this.inserimento.get('provincia')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isProvinciaCompiled = !!value;
      console.log('provincia:', value);
      console.log('provincia is valid:', this.inserimento.get('provincia')?.valid);
      console.log('isProvinciaCompiled:', this.isProvinciaCompiled);
    });
    
    this.inserimento.get('latitudine')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isLatitudineCompiled = !!value;
      console.log('latitudine:', value);
      console.log('latitudine is valid:', this.inserimento.get('latitudine')?.valid);
      console.log('isLatitudineCompiled:', this.isLatitudineCompiled);
    });
    
    this.inserimento.get('longitudine')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isLongitudineCompiled = !!value;
      console.log('longitudine:', value);
      console.log('longitudine is valid:', this.inserimento.get('longitudine')?.valid);
      console.log('isLongitudineCompiled:', this.isLongitudineCompiled);
    });
    
    this.inserimento.get('descrizioneBreve')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isDescrizioneBreveCompiled = !!value;
      console.log('descrizioneBreve:', value);
      console.log('descrizioneBreve is valid:', this.inserimento.get('descrizioneBreve')?.valid);
      console.log('isDescrizioneBreveCompiled:', this.isDescrizioneBreveCompiled);
    });
    
    this.inserimento.get('costo')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isCostoCompiled = !!value;
      console.log('costo:', value);
      console.log('costo is valid:', this.inserimento.get('costo')?.valid);
      console.log('isCostoCompiled:', this.isCostoCompiled);
    });
    
    this.inserimento.get('descrizioneLunga')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.isDescrizioneLungaCompiled = !!value;
      console.log('descrizioneLunga:', value);
      console.log('descrizioneLunga is valid:', this.inserimento.get('descrizioneLunga')?.valid);
      console.log('isDescrizioneLungaCompiled:', this.isDescrizioneLungaCompiled);
    });
  }

  ngOnInit(): void {
    let nome = this.inserimento.get('nome')?.value;
    console.log('nome:', nome);

    let tipo = this.inserimento.get('tipo')?.value;
    console.log('tipo:', tipo);

    let categoria = this.inserimento.get('categoria')?.value;
    console.log('categoria:', categoria);

    let disponibilita = this.inserimento.get('disponibilita')?.value;
    console.log('disponibilita:', disponibilita);

    let indirizzo = this.inserimento.get('indirizzo')?.value;
    console.log('indirizzo:', indirizzo);

    let cap = this.inserimento.get('cap')?.value;
    console.log('cap:', cap);

    let citta = this.inserimento.get('citta')?.value;
    console.log('citta:', citta);

    let provincia = this.inserimento.get('provincia')?.value;
    console.log('provincia:', provincia);

    let latitudine = this.inserimento.get('latitudine')?.value;
    console.log('latitudine:', latitudine);

    let longitudine = this.inserimento.get('longitudine')?.value;
    console.log('longitudine:', longitudine);

    let descrizioneBreve = this.inserimento.get('descrizioneBreve')?.value;
    console.log('descrizioneBreve:', descrizioneBreve);

    let costo = this.inserimento.get('costo')?.value;
    console.log('costo:', costo);

    let descrizioneLunga = this.inserimento.get('descrizioneLunga')?.value;
    console.log('descrizioneLunga:', descrizioneLunga);

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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

  // File
  selectedFiles: File[] = [];
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
    const formData = new FormData();
    formData.append('alloggio', this.inserimento.get('tipo')?.value);
    formData.append('nome', this.inserimento.get('nome')?.value);
    formData.append('disponibilita', this.inserimento.get('disponibilita')?.value)
    if (this.inserimento.get('tipo')?.value === 'true') {
      formData.append('categoriaAlloggio', this.inserimento.get('categoria')?.value);
    } else {
      formData.append('categoriaAttivitaTuristica', this.inserimento.get('categoria')?.value);
    }
    formData.append('indirizzo', this.inserimento.get('indirizzo')?.value);
    formData.append('cap', this.inserimento.get('cap')?.value);
    formData.append('citta', this.inserimento.get('citta')?.value);
    formData.append('provincia', this.inserimento.get('provincia')?.value);
    formData.append('latitudine', this.inserimento.get('latitudine')?.value);
    formData.append('longitudine', this.inserimento.get('longitudine')?.value);
    formData.append('descrizioneBreve', this.inserimento.get('descrizioneBreve')?.value);
    this.prezzo = formData.append('prezzo', this.inserimento.get('costo')?.value);
    formData.append('descrizioneLunga', this.inserimento.get('descrizioneLunga')?.value);
    console.log(formData.getAll)

    if (this.inserimento.get('tipo')?.value === 'true') {
      this.openPopupAlloggio(this.data.id)
    } else {
      this.openPopupConferma('Attivita inserita con successo')
    }

    // this.attivitaService.inserimentoAttivita(formData)
    //   .subscribe((response) => {
    //     console.log('Dati inviati', response)
    //     if (this.inserimento.get('tipo')?.value === 'true' && response?.status === 'success') {
    //       const idAttivita = response.data.id;
    //       this.openPopupAlloggio(idAttivita)
    //     } else if (response?.status === 'success') {
    //       this.openPopupConferma('Attivita inserita con successo')
    //     }
    //     else {
    //       const errorMessage = response?.error?.message || 'Errore sconosciuto';
    //       this.openPopupConferma(errorMessage);
    //     }
    //   },
    //     (error) => {
    //       this.openPopupConferma(error.error.data)
    //       console.error(error)
    //     });
  }
}
