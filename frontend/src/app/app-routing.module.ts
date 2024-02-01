import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { QuestionarioComponent } from './componenti/questionario/questionario.component';
import { RisultatiComponent } from './componenti/ricerca/risultati/risultati.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { GestioneAttivitaComponent } from './componenti/gestione-attivita/gestione-attivita.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { ChisiamoComponent } from './componenti/chisiamo/chisiamo.component';
import { GestioneValoriComponent } from './componenti/gestione-attivita/gestione-valori/gestione-valori.component';
import { LoginComponent } from './componenti/login/login.component';
import { AreaRiservataComponent } from './componenti/area-riservata/area-riservata.component';
import { GenerazioneAutomaticaComponent } from './componenti/generazione-automatica/generazione-automatica.component';

const routes: Routes = [
  { path: 'chisiamo', component: ChisiamoComponent },
  { path: 'itinerarioAutomatico', component: GenerazioneAutomaticaComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'attivita/:id', component: PaginaAttivitaComponent },
  { path: 'homepage', component: GestionePrenotazioniAttiveComponent },
  { path: 'ricerca/posizione', component: RisultatiComponent },
  { path: 'mieAttivita', component: GestioneAttivitaComponent },
  { path: 'modificaValori/:id', component: GestioneValoriComponent },
  { path: 'generazione-automatica', component: GenerazioneAutomaticaComponent },
  { path: 'tabellaP', component: GestionePrenotazioniAttiveComponent },
  { path: 'login', component: LoginComponent },
  { path: 'area-riservata', component: AreaRiservataComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
