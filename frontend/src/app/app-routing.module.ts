import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';
import { HomePageComponent } from './componenti/home-page/home-page.component';

const routes: Routes = [
  { path: 'registrazione', component: RegistrazioneComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  {path: '', component: HomePageComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
