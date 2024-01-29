import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RisultatiComponent } from './componenti/ricerca/risultati/risultati.component';

const routes: Routes = [
  {path: 'ricerca/posizione', component: RisultatiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
