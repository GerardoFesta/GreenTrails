import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { InserimentoAttivitaComponent } from './componenti/inserimento-attivita/inserimento-attivita.component';

const routes: Routes = [
  { path: 'paginaattiva', component: PaginaAttivitaComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'inserimentoattivita', component: InserimentoAttivitaComponent },
  { path: '', redirectTo: '/paginaattiva', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
