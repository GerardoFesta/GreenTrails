import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentiComponent } from './componenti/componenti.component';
import { SingupComponent } from './componenti/singup/singup.component';
import { DashboardComponent } from './componenti/dashboard./dashboard..component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentiComponent,
    SingupComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
