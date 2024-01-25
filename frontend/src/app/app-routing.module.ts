import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { InserimentoAttivitaComponent } from './componenti/inserimento-attivita/inserimento-attivita.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'paginaattiva', component: PaginaAttivitaComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'inserimentoattivita', component: InserimentoAttivitaComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
