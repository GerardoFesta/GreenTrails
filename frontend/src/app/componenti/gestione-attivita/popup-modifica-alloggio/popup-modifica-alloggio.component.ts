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
    this.camere.reset();
  }

  inviaCamere() {
    if (this.camereInserite.length > 0) {
      this.openPopupConferma('Attivita inserita con successo');
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
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      }, (error) => {
        console.log(error);
      });
    });
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
