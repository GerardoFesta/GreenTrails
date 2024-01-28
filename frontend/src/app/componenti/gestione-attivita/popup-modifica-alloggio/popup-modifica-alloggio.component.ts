import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CamereService } from 'src/app/servizi/camere.service';
import { PopUpAlloggioComponent } from '../../inserimento-attivita/pop-up-alloggio/pop-up-alloggio.component';
import { PopupConfermaModificaComponent } from '../popup-conferma-modifica/popup-conferma-modifica.component';
import { PopupEliminazioneCameraComponent } from '../popup-eliminazione-camera/popup-eliminazione-camera.component';

@Component({
  selector: 'app-popup-modifica-alloggio',
  templateUrl: './popup-modifica-alloggio.component.html',
  styleUrls: ['./popup-modifica-alloggio.component.css']
})
export class PopupModificaAlloggioComponent implements OnInit, OnChanges, DoCheck, AfterContentInit,
  AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  camere: FormGroup
  id: any
  camereInserite: any[] = []
  eliminazioneConfermata: boolean = false;

  isCapienza!: boolean
  isPrezzo!: boolean;
  isCategoria!: boolean;
  isDescrizione!: boolean;
  isDisponibilita!: boolean;

  constructor(public dialogRef: MatDialogRef<PopUpAlloggioComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private camereService: CamereService, private dialog: MatDialog) {
    this.camere = this.formBuilder.group({
      capienza: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      prezzo: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      categoria: ['', Validators.required],
      descrizione: ['', Validators.required],
      disponibilita: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],

    });

  }

  checkValidity(): boolean {
    const capienzaPattern = /^[0-9]+$/;
    const prezzoPattern = /^[0-9]+(\.[0-9]{1,2})?$/;
    const disponibilitaPattern = /^[0-9]+$/;

    this.isCapienza = this.camere.get('capienza')!.value.trim().length > 0 && capienzaPattern.test(this.camere.get('capienza')!.value);
    this.isPrezzo = this.camere.get('prezzo')!.value.trim().length > 0 && prezzoPattern.test(this.camere.get('prezzo')!.value);
    this.isCategoria = this.camere.get('categoria')!.value.trim().length > 0;
    this.isDescrizione = this.camere.get('descrizione')!.value.trim().length > 0;
    this.isDisponibilita = this.camere.get('disponibilita')!.value.trim().length > 0 && disponibilitaPattern.test(this.camere.get('disponibilita')!.value);

    return this.isCapienza && this.isPrezzo && this.isCategoria && this.isDescrizione && this.isDisponibilita;
  }


  ngOnInit(): void {
    console.log('Attivita creata:', this.data.idAttivita);
    console.log(this.data.idAttivita)
    this.id = this.data.idAttivita
    this.visualizzaCamerePerAlloggio();
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  openPopupConferma(message: string): void {
    const dialogRef = this.dialog.open(PopupConfermaModificaComponent, {
      width: '60%',
      data: { message },
      disableClose: true,

    });
  }

  aggiungiCamera() {
    console.log(this.id)
    const camera = {
      categoria: this.camere.get('categoria')?.value,
      disponibilita: this.camere.get('disponibilita')?.value,
      descrizione: this.camere.get('descrizione')?.value,
      capienza: this.camere.get('capienza')?.value,
      prezzo: this.camere.get('prezzo')?.value
    };

    this.camereInserite.push(camera);

    this.camereService.inserimentoCamere(
      this.id,
      this.camere.get('categoria')?.value,
      this.camere.get('disponibilita')?.value,
      this.camere.get('descrizione')?.value,
      this.camere.get('capienza')?.value,
      this.camere.get('prezzo')?.value


    ).subscribe((response) => {


    })
  }

  inviaCamere() {
    if (this.camereInserite.length > 0) {
      this.openPopupConferma('Alloggio modificato con successo');
    } else {

    }
  }

  visualizzaCamerePerAlloggio() {
    this.camereService.visualizzaCamerePerAlloggio(this.id).subscribe((risposta) => {
      console.log("Camere per alloggio n." + this.id, risposta);

      risposta.data.forEach((item: any) => {
        this.camereInserite.push(item);
      });
    })
  }

  delete(id: number): void {
    this.camereService.visualizzaCamera(id).subscribe((risposta) => {
      console.log("Camera con id: " + id, risposta);

      const dialogRef = this.dialog.open(PopupEliminazioneCameraComponent, {
        data: {
          message: 'Sei sicuro di voler eliminare la camera?',
          id: id,
          capienza: this.data.capienza,
          prezzo: this.data.prezzo,
          categoria: this.data.categoria,
          descirzione: this.data.descrizione,
          disponibilita: this.data.disponibilita
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          window.location.reload();
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  reset() {
    this.camere.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

}
