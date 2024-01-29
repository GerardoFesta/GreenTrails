import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestioneAttivitaComponent } from './componenti/gestione-attivita/gestione-attivita.component';
import { GestioneValoriComponent } from './componenti/gestione-attivita/gestione-valori/gestione-valori.component';

const routes: Routes = [
  { path: 'mieAttivita', component: GestioneAttivitaComponent },
  {path: 'modificaValori/:id', component: GestioneValoriComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
