import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenti/login/login.component';
import { PaginaAttivitaComponent } from './componenti/pagina-attivita/pagina-attivita.component';
import { RegistrazioneComponent } from './componenti/registrazione/registrazione.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  { path: 'paginaattiva', component: PaginaAttivitaComponent },
  { path: 'registrazione', component: RegistrazioneComponent },
  // { path: '', redirectTo: '/paginaattiva', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
