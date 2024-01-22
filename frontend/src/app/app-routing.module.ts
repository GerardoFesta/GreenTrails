import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent },
  {path: 'attivita/:id', component: PaginaAttivitaComponent},
  { path: 'registrazione', component: RegistrazioneComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
