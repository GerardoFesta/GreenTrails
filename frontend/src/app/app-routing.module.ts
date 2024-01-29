import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { RisultatiComponent } from './componenti/ricerca/risultati/risultati.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { GestioneAttivitaComponent } from './componenti/gestione-attivita/gestione-attivita.component';
import { GestioneValoriComponent } from './componenti/gestione-attivita/gestione-valori/gestione-valori.component';
import { LoginComponent } from './componenti/login/login.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'attivita/:id', component: PaginaAttivitaComponent },
  { path: 'prenotazioni', component: GestionePrenotazioniAttiveComponent },
  { path: 'ricerca/posizione', component: RisultatiComponent },
  { path: 'mieAttivita', component: GestioneAttivitaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'modificaValori/:id', component: GestioneValoriComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
