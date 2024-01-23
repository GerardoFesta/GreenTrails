import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';

const routes: Routes = [
  {path: '', component: GestionePrenotazioniAttiveComponent},
  { path: 'registrazione', component: RegistrazioneComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  { path: 'login', component: LoginComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
