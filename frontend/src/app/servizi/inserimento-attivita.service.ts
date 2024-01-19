import { Injectable } from '@angular/core';
import { InserimentoAttivitaComponent } from '../componenti/inserimento-attivita/inserimento-attivita.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class InserimentoAttivitaService {

  constructor(private dialog: MatDialog) { }

  apriDialog() {
    const dialogRef =
      this.dialog.open(InserimentoAttivitaComponent, { width: '100%' })

  }
}
