import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { RisultatiComponent } from './componenti/ricerca/risultati/risultati.component';

const routes: Routes = [
  { path: 'registrazione', component: RegistrazioneComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  {path: 'prenotazioni', component: GestionePrenotazioniAttiveComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ricerca/posizione', component: RisultatiComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
