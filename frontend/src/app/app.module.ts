import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { GestioneAttivitaComponent } from './componenti/gestione-attivita/gestione-attivita.component';
import { PopupEliminazioneComponent } from './componenti/gestione-attivita/popup-eliminazione-attivita/popup-eliminazione-attivita.component';
import { InserimentoAttivitaComponent } from './componenti/inserimento-attivita/inserimento-attivita.component';
import { PopUpConfermaComponent } from './componenti/inserimento-attivita/pop-up-conferma/pop-up-conferma.component';
import { PopUpAlloggioComponent } from './componenti/inserimento-attivita/pop-up-alloggio/pop-up-alloggio.component';
import { PopupModificaComponent } from './componenti/gestione-attivita/popup-modifica-attivita-turistica/popup-modifica-attivita-turistica.component';
import { PopupModificaAlloggioComponent } from './componenti/gestione-attivita/popup-modifica-alloggio/popup-modifica-alloggio.component';
import { PopupConfermaModificaComponent } from './componenti/gestione-attivita/popup-conferma-modifica/popup-conferma-modifica.component';
import { PopupModificaDatiAlloggioComponent } from './componenti/gestione-attivita/popup-modifica-dati-alloggio/popup-modifica-dati-alloggio.component';
import { PopupEliminazioneCameraComponent } from './componenti/gestione-attivita/popup-eliminazione-camera/popup-eliminazione-camera.component';
import { GestioneValoriComponent } from './componenti/gestione-attivita/gestione-valori/gestione-valori.component';
import { PopupComponent } from './componenti/gestione-attivita/gestione-valori/popup/popup.component';
import { PopUpCategorieComponent } from './componenti/inserimento-attivita/pop-up-categorie/pop-up-categorie.component';
import { PopupModificaCategorieComponent } from './componenti/gestione-attivita/popup-modifica-categorie/popup-modifica-categorie.component';
import { PopupEliminazioneCategorieComponent } from './componenti/gestione-attivita/popup-eliminazione-categorie/popup-eliminazione-categorie.component';
import { LoginComponent } from './componenti/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    GestioneAttivitaComponent,
    PopupEliminazioneComponent,
    InserimentoAttivitaComponent,
    PopUpConfermaComponent,
    PopUpAlloggioComponent,
    PopupModificaComponent,
    PopupModificaAlloggioComponent,
    PopupConfermaModificaComponent,
    PopupModificaDatiAlloggioComponent,
    PopupEliminazioneCameraComponent,
    GestioneValoriComponent,
    PopupComponent,
    PopUpCategorieComponent,
    PopupModificaCategorieComponent,
    PopupEliminazioneCategorieComponent,
    PopupModificaCategorieComponent,
    PopupEliminazioneCategorieComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule,
    MatTooltipModule,
    HttpClientModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCarouselModule,
    MatTooltipModule,
    HttpClientModule,
    MatNativeDateModule,
    Ng2SearchPipeModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
