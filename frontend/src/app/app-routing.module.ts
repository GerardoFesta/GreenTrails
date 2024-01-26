import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';
import { GestionePrenotazioniAttiveComponent } from './componenti/gestione-prenotazioni-attive/gestione-prenotazioni-attive.component';
import { GestioneValoriComponent } from './gestione-valori/gestione-valori.component';
import { ModificaValoriAdminComponent } from './componenti/modifica-valori-admin/modifica-valori-admin.component';

const routes: Routes = [
  { path: 'registrazione', component: RegistrazioneComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  {path: '', component: ModificaValoriAdminComponent},
  {path: 'homepage', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
