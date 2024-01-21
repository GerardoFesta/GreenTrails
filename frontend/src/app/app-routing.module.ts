import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { PrenotazioniComponent } from './componenti/pagina-attivita/info-attivita/politiche-ecosostenibili-attivita/prenotazioni/prenotazioni.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
