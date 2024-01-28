import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { QuestionarioComponent } from './componenti/questionario/questionario.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { AreaRiservataComponent } from './componenti/area-riservata/area-riservata.component';
import { GenerazioneAutomaticaComponent } from './componenti/generazione-automatica/generazione-automatica.component';

const routes: Routes = [
  { path: 'registrazione', component: RegistrazioneComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'login', component: LoginComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  {path: 'tabellaP', component: GestionePrenotazioniAttiveComponent},
  {path: 'homepage', component: HomePageComponent},
  {path: 'tabellaP', component: GestionePrenotazioniAttiveComponent},
  {path: 'login', component: LoginComponent},
  {path: 'area-riservata', component: AreaRiservataComponent},
  {path: '', component: GenerazioneAutomaticaComponent},






];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
